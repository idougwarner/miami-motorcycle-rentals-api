import { ApiResponseProperty } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { BaseResponseDto } from '..';
import { MediaItem } from 'src/modules/entity/media-item.entity';
import { BikeType } from 'src/modules/entity/bike-type.entity';

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
  @Transform((bike: { obj: BikeType }) => bike?.obj?.mediaItem)
  mediaItem: MediaItem;
}
