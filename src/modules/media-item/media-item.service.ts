import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { MediaItemRepository } from './media-item.repository';
import { MediaItem } from '../entity/media-item.entity';
import { FileSystemStoredFile } from 'nestjs-form-data';
import { uploadFormDataFileToS3 } from 'src/shared/utils/uploadFileToS3';
import { MediaTransformRequestDto } from 'src/shared/dtos/media/media-transform-request.dto';
import { transformAndUploadToS3 } from 'src/shared/utils/transformAndUploadToS3';
import { TransformedMediaItemService } from '../transformed-media-item/transformed-media-item.service';

@Injectable()
export class MediaItemService {
  constructor(
    private mediaItemRepository: MediaItemRepository,
    private transformedMediaItemService: TransformedMediaItemService,
  ) {}

  async create(
    featureMediaItemPayload: Partial<MediaItem>,
    galleryMediaItemsPayload: Partial<MediaItem>[],
    featuredImageFile: FileSystemStoredFile,
    galleryImageFiles: FileSystemStoredFile[],
  ): Promise<{ featuredMediaItem: MediaItem; galleryMediaItems: MediaItem[] }> {
    // create featured media item
    const featuredImageUploadedData = await uploadFormDataFileToS3({
      file: featuredImageFile,
      fileName: featureMediaItemPayload.filename,
    });
    const {
      uploadedFileUrl: featuredImageUrl,
      fileSizeInKB: featuredImageSize,
    } = featuredImageUploadedData;
    const featuredMediaItem = await this.mediaItemRepository.createMediaItem({
      ...featureMediaItemPayload,
      filesize: featuredImageSize,
      mediaUrl: featuredImageUrl,
      mimeType: featuredImageFile['busBoyMimeType'],
    });

    // create gallery media items
    const galleryImageUploadPromises = galleryImageFiles.map((file, index) =>
      uploadFormDataFileToS3({
        file,
        fileName: galleryMediaItemsPayload[index].filename,
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
          ...galleryMediaItemsPayload[index],
          filesize: galleryImageSize,
          mediaUrl: galleryImageUrl,
          mimeType: galleryImageFiles[index]['busBoyMimeType'],
        });
      },
    );
    const galleryMediaItems = await Promise.all(galleryMediaItemsPromise);

    return {
      featuredMediaItem,
      galleryMediaItems,
    };
  }

  async transformMediaItems(data: MediaTransformRequestDto) {
    // featured image transform
    const featuredImageURLData = data.featuredImage;
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
    const transformedFeaturedImages = await transformAndUploadToS3(
      featuredImageBuffer,
      featuredImageURLData,
    );

    // gallery images transform
    const galleryImagesURLData = data.galleryImages;
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
    const galleryFeaturedImages = await Promise.all(
      galleryImagesTransformPromises,
    );

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
}
