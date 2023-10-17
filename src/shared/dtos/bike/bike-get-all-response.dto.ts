import { ApiResponseProperty } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { BaseResponseDto } from '..';
import { BikeBrand } from 'src/modules/entity/bike-brands.entity';
import { MediaItem } from 'src/modules/entity/media-item.entity';
import { Bike } from 'src/modules/entity/bike.entity';

export class BikeGetAllResponseDto extends BaseResponseDto {
  @ApiResponseProperty()
  @Expose()
  id: number;

  @ApiResponseProperty()
  @Expose()
  name: string;

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
    if (bike?.obj?.featuredMediaItem?.transformedMediaItems?.[0]) {
      bike.obj.featuredMediaItem.transformedMediaItems[0].alt =
        bike.obj.featuredMediaItem.alt;
      bike.obj.featuredMediaItem.transformedMediaItems[0].mediaUrl =
        bike.obj.featuredMediaItem.transformedMediaItems[0].mediaUrl.replace(
          /^(https?:\/\/[^\/]*)(.*)$/,
          `${process.env.CLOUDFRONT_BASE_URL}$2`,
        );
    }
    return bike?.obj?.featuredMediaItem?.transformedMediaItems?.[0];
  })
  featuredMediaItem: MediaItem;

  @ApiResponseProperty()
  @Expose()
  @Transform((bike: { obj: Bike }) => {
    return bike?.obj?.bikeBasePrices?.length;
  })
  bikeBasePriceCount: number;

  @ApiResponseProperty()
  @Expose()
  @Transform((bike: { obj: Bike }) => {
    return bike?.obj?.insurances?.length;
  })
  insuranceCount: number;

  @ApiResponseProperty()
  @Expose()
  @Transform((bike: { obj: Bike }) => {
    return bike?.obj?.rentalOrders?.length;
  })
  rentalOrderCount: number;

  @ApiResponseProperty()
  @Expose()
  position: number;
}
