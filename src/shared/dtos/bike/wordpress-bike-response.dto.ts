import { ApiResponseProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class BikeForOrderResponse {
  @ApiResponseProperty()
  @Expose()
  @Transform((bike) => bike?.obj?.id)
  id: number;

  @ApiResponseProperty()
  @Expose()
  @Transform((bike) => bike?.obj?.name)
  title: string;

  @ApiResponseProperty()
  @Expose()
  @Transform((bike) => bike?.obj?.brand?.name)
  brand: string;

  @ApiResponseProperty()
  @Expose()
  @Transform((bike) => bike?.obj?.model)
  model: string;

  @ApiResponseProperty()
  @Expose()
  @Transform((bike) => {
    const price = bike?.obj?.regularPrice;
    return price ? Number(price) : 0;
  })
  dailyPrice: number;

  @ApiResponseProperty()
  @Expose()
  @Transform((bike) => {
    const price = bike?.obj?.discountPrice;
    return price ? Number(price) : 0;
  })
  discountPrice: number;

  @ApiResponseProperty()
  @Expose()
  @Transform((bike) => {
    let imageUrl = bike?.obj?.featuredMediaItem.mediaUrl || '';
    return imageUrl;
  })
  primaryImage: string;
}
