import { ApiResponseProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { BaseResponseDto } from '..';
import { BikeBrand } from 'src/modules/entity/bike-brands.entity';
import { MediaItem } from 'src/modules/entity/media-item.entity';
import { Bike } from 'src/modules/entity/bike.entity';
import { parseWpAttachmentMetadata } from 'src/shared/utils/parseWpAttachmentMetadata';
import { BikeOffDay } from 'src/modules/entity/bike-off-day.entity';
import { BikeBasePrice } from 'src/modules/entity/bike-base-price.entity';
import { RelatedBike } from 'src/modules/entity/related-bike.entity';

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

  @ApiResponseProperty()
  @Expose()
  status: string;

  @ApiResponseProperty()
  @Expose()
  discountPercentage: string;

  @ApiResponseProperty()
  @Expose()
  position: number;

  @ApiResponseProperty({ type: [BikeOffDay] })
  @Expose()
  @Transform((bike: { obj: Bike }) => {
    return bike?.obj?.bikeOffDays;
  })
  bikeOffDays: BikeOffDay[];

  @ApiResponseProperty({ type: [BikeBasePrice] })
  @Expose()
  @Transform((bike: { obj: Bike }) => {
    return bike?.obj?.bikeBasePrices;
  })
  bikeBasePrices: BikeBasePrice[];

  @ApiResponseProperty({ type: [RelatedBike] })
  @Expose()
  @Transform((bike: { obj: Bike }) => {
    return bike?.obj?.relatedBikes;
  })
  relatedBikes: RelatedBike[];
}
