import { ApiResponseProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { BaseResponseDto } from '..';
import { MediaItem } from 'src/modules/entity/media-item.entity';
import { BikeBrand } from 'src/modules/entity/bike-brands.entity';

export class BikeBrandGetResponseDto extends BaseResponseDto {
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
  mediaItemId: number;

  @ApiResponseProperty()
  @Expose()
  @Transform((bike: { obj: BikeBrand }) => {
    if (bike?.obj?.mediaItem) {
      bike.obj.mediaItem.mediaUrl = bike.obj.mediaItem.mediaUrl.replace(
        /^(https?:\/\/[^\/]*)(.*)$/,
        `${process.env.CLOUDFRONT_BASE_URL}$2`,
      );
    }
    return bike?.obj?.mediaItem;
  })
  mediaItem: MediaItem;

  @ApiResponseProperty()
  @Expose()
  revision: string;

  @ApiResponseProperty()
  @Expose()
  isPopular: string;
}
