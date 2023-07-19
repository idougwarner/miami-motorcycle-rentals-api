import { ApiResponseProperty } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { BaseResponseDto } from '..';
import { BikeBrand } from 'src/modules/entity/bike-brands.entity';
import { MediaItem } from 'src/modules/entity/media-item.entity';
import { Bike } from 'src/modules/entity/bike.entity';
import { parseWpAttachmentMetadata } from 'src/shared/utils/parseWpAttachmentMetadata';

export class BikeGetResponseDto extends BaseResponseDto {
  @ApiResponseProperty()
  @Expose()
  id: number;

  @ApiResponseProperty()
  @Expose()
  name: string;

  @ApiResponseProperty()
  @Expose()
  seoTitle: string;

  @ApiResponseProperty()
  @Expose()
  seoDescription: string;

  @ApiResponseProperty()
  @Expose()
  slug: string;

  @ApiResponseProperty()
  @Expose()
  brandId: number;

  @ApiResponseProperty()
  @Expose()
  @Transform((bike: { obj: Bike }) => bike?.obj?.brand)
  brand: BikeBrand;

  @ApiResponseProperty()
  @Expose()
  typeId: number;

  @ApiResponseProperty()
  @Expose()
  model: string;

  @ApiResponseProperty()
  @Expose()
  regularPrice: number;

  @ApiResponseProperty()
  @Expose()
  discountPrice: number;

  @ApiResponseProperty()
  @Expose()
  featuredMediaItemId: number;

  @ApiResponseProperty()
  @Expose()
  @Transform((bike: { obj: Bike }) => {
    if (bike?.obj?.featuredMediaItem) {
      bike.obj.featuredMediaItem.mediaUrl =
        bike.obj.featuredMediaItem.mediaUrl.replace(
          /^(https?:\/\/[^\/]*)(.*)$/,
          `${process.env.CLOUDFRONT_BASE_URL}$2`,
        );

      if (bike?.obj?.featuredMediaItem?.transformedMediaItems) {
        bike?.obj?.featuredMediaItem?.transformedMediaItems.forEach(
          (transformedMediaItem) => {
            transformedMediaItem.mediaUrl =
              transformedMediaItem.mediaUrl.replace(
                /^(https?:\/\/[^\/]*)(.*)$/,
                `${process.env.CLOUDFRONT_BASE_URL}$2`,
              );
          },
        );
      }
    }
    return bike?.obj?.featuredMediaItem;
  })
  featuredMediaItem: MediaItem;

  @ApiResponseProperty()
  @Expose()
  @Transform((bike) => parseWpAttachmentMetadata(bike?.obj?.highlights))
  highlights;

  @ApiResponseProperty()
  @Expose()
  description: string;

  @ApiResponseProperty()
  @Expose()
  distanceIncluded: string;

  @ApiResponseProperty()
  @Expose()
  @Transform((bike) => parseWpAttachmentMetadata(bike?.obj?.features))
  features;

  @ApiResponseProperty()
  @Expose()
  @Transform((bike) => parseWpAttachmentMetadata(bike?.obj?.extras))
  extras;
}
