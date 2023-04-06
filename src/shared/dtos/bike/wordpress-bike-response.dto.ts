import { ApiResponseProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class WpBikeResponse {
  @ApiResponseProperty()
  @Expose()
  @Transform((bike) => bike?.obj?.id)
  id: number;

  @ApiResponseProperty()
  @Expose()
  @Transform((bike) => bike?.obj?.title?.rendered)
  title: string;

  @ApiResponseProperty()
  @Expose()
  @Transform((bike) => bike?.obj?.ACF?.brand)
  brand: string;

  @ApiResponseProperty()
  @Expose()
  @Transform((bike) => bike?.obj?.ACF?.model)
  model: string;

  @ApiResponseProperty()
  @Expose()
  @Transform((bike) => {
    const price = bike?.obj?.ACF?.['regular-price'];
    return price ? Number(price) : 0;
  })
  dailyPrice: number;

  @ApiResponseProperty()
  @Expose()
  @Transform((bike) => {
    const price = bike?.obj?.ACF?.['discount-price'];
    return price ? Number(price) : 0;
  })
  discountPrice: number;

  @ApiResponseProperty()
  @Expose()
  @Transform((bike) => {
    let imageUrl = '';
    Object.keys(bike?.obj?.ACF?.gallery).forEach((bikeImgField) => {
      if (bike?.obj?.ACF?.gallery[bikeImgField] && !imageUrl) {
        imageUrl = bike?.obj?.ACF?.gallery[bikeImgField].url;
      }
    });

    return imageUrl;
  })
  primaryImage: string;
}
