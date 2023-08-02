import { ApiResponseProperty } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { BaseResponseDto } from '..';
import { BikeType } from 'src/modules/entity/bike-type.entity';
import { TransformedMediaItem } from 'src/modules/entity/transformed-media-item.entity';

export class BikeTypeGetResponseDto extends BaseResponseDto {
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
  @Transform((bike: { obj: BikeType }) => {
    if (bike?.obj?.mediaItem?.transformedMediaItems?.[0]) {
      bike.obj.mediaItem.transformedMediaItems[0].alt = bike.obj.mediaItem.alt;
      bike.obj.mediaItem.transformedMediaItems[0].mediaUrl =
        bike.obj.mediaItem.transformedMediaItems[0].mediaUrl.replace(
          /^(https?:\/\/[^\/]*)(.*)$/,
          `${process.env.CLOUDFRONT_BASE_URL}$2`,
        );
    }
    return bike?.obj?.mediaItem?.transformedMediaItems?.[0];
  })
  mediaItem: TransformedMediaItem;
}
