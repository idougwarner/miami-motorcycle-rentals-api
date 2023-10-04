import { Injectable } from '@nestjs/common';
import { MediaItemRepository } from './media-item.repository';
import { MediaItem } from '../entity/media-item.entity';
import { FileSystemStoredFile } from 'nestjs-form-data';
import { uploadFormDataFileToS3 } from 'src/shared/utils/uploadFileToS3';

@Injectable()
export class MediaItemService {
  constructor(private mediaItemRepository: MediaItemRepository) {}

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
        });
      },
    );
    const galleryMediaItems = await Promise.all(galleryMediaItemsPromise);

    return {
      featuredMediaItem,
      galleryMediaItems,
    };
  }
}
