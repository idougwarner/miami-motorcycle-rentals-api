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
  @Transform((bike: { obj: Bike }) => bike?.obj?.featuredMediaItem)
  featuredMediaItem: MediaItem;
}
