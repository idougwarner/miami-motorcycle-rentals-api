import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { MediaItemRepository } from './media-item.repository';
import { MediaItem } from '../entity/media-item.entity';
import { FileSystemStoredFile } from 'nestjs-form-data';
import { uploadFormDataFileToS3 } from 'src/shared/utils/uploadFileToS3';
import { MediaTransformRequestDto } from 'src/shared/dtos/media/media-transform-request.dto';
import { transformAndUploadToS3 } from 'src/shared/utils/transformAndUploadToS3';
import { TransformedMediaItemService } from '../transformed-media-item/transformed-media-item.service';
import { CreateImageDto } from 'src/shared/dtos/media/media-create-request.dto';

@Injectable()
export class MediaItemService {
  constructor(
    private mediaItemRepository: MediaItemRepository,
    private transformedMediaItemService: TransformedMediaItemService,
  ) {}

  async create(
    featureMediaItemPayload: string,
    galleryMediaItemsPayload: string,
    featuredImageFile: FileSystemStoredFile,
    galleryImageFiles: FileSystemStoredFile[],
  ): Promise<{ featuredMediaItem: MediaItem; galleryMediaItems: MediaItem[] }> {
    // create featured media item
    let featuredMediaItem: MediaItem = null;
    let galleryMediaItems: MediaItem[] = [];

    if (featureMediaItemPayload) {
      const featureMediaItemData: CreateImageDto = JSON.parse(
        JSON.parse(featureMediaItemPayload),
      );
      const featuredImageUploadedData = await uploadFormDataFileToS3({
        file: featuredImageFile,
        fileName: featureMediaItemData.filename,
      });
      const {
        uploadedFileUrl: featuredImageUrl,
        fileSizeInKB: featuredImageSize,
      } = featuredImageUploadedData;
      featuredMediaItem = await this.mediaItemRepository.createMediaItem({
        ...featureMediaItemData,
        filesize: featuredImageSize,
        mediaUrl: featuredImageUrl,
        mimeType: featuredImageFile['busBoyMimeType'],
      });
    }

    // create gallery media items
    if (galleryMediaItemsPayload) {
      const galleryMediaItemsData: CreateImageDto[] = JSON.parse(
        JSON.parse(galleryMediaItemsPayload),
      );
      const galleryImageUploadPromises = galleryImageFiles.map((file, index) =>
        uploadFormDataFileToS3({
          file,
          fileName: galleryMediaItemsData[index].filename,
          index,
        }),
      );
      const galleryImagesUploadedData = await Promise.all(
        galleryImageUploadPromises,
      );
      const galleryMediaItemsPromise = galleryImagesUploadedData.map(
        async (data) => {
          const {
            uploadedFileUrl: galleryImageUrl,
            fileSizeInKB: galleryImageSize,
            index,
          } = data;

          return this.mediaItemRepository.createMediaItem({
            ...galleryMediaItemsData[index],
            filesize: galleryImageSize,
            mediaUrl: galleryImageUrl,
            mimeType: galleryImageFiles[index]['busBoyMimeType'],
          });
        },
      );
      galleryMediaItems = await Promise.all(galleryMediaItemsPromise);
    }

    return {
      featuredMediaItem,
      galleryMediaItems,
    };
  }

  async transformMediaItems(data: MediaTransformRequestDto) {
    let transformedFeaturedImages = [];
    let galleryFeaturedImages = [];

    // featured image transform
    const featuredImageURLData = data.featuredImage;
    if (featuredImageURLData) {
      const featuredImageResponse = await axios.get(
        featuredImageURLData.mediaUrl,
        {
          responseType: 'arraybuffer',
        },
      );
      const featuredImageBuffer = Buffer.from(
        featuredImageResponse.data,
        'binary',
      );
      transformedFeaturedImages = await transformAndUploadToS3(
        featuredImageBuffer,
        featuredImageURLData,
      );
    }

    // gallery images transform
    const galleryImagesURLData = data.galleryImages;
    if (galleryImagesURLData) {
      const galleryImagesTransformPromises = galleryImagesURLData.map(
        async (galleryData) => {
          const galleryImageResponse = await axios.get(galleryData.mediaUrl, {
            responseType: 'arraybuffer',
          });
          const galleryImageBuffer = Buffer.from(
            galleryImageResponse.data,
            'binary',
          );

          return transformAndUploadToS3(galleryImageBuffer, galleryData);
        },
      );
      galleryFeaturedImages = await Promise.all(galleryImagesTransformPromises);
    }

    // save to db
    const flattenedGalleryFeaturedImages = galleryFeaturedImages.flat();
    const transformedImages = [
      ...transformedFeaturedImages,
      ...flattenedGalleryFeaturedImages,
    ];

    const transformedImagesPromise = transformedImages.map((data) => {
      const transformedMediaItemData = {
        width: data.size.width,
        height: data.size.height,
        filesize: data.fileSizeInKB,
        mimeType: data.mimeType,
        mediaSize: data.size.mediaSize,
        mediaUrl: data.mediaUrl,
        filename: data.filename,
        mediaItemId: data.id,
        type: 'image',
      };
      return this.transformedMediaItemService.create(transformedMediaItemData);
    });

    return await Promise.all(transformedImagesPromise);
  }

  async getById(id: number): Promise<MediaItem> {
    return this.mediaItemRepository.findById(id);
  }
}
