import { ApiResponseProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BikeStatus } from 'src/shared/common';
import { BaseResponseDto } from '../base-response.dto';

export class BikeBrandCreateResponseDto extends BaseResponseDto {
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
  isPopular: boolean;

  @ApiResponseProperty()
  @Expose()
  revision: string;
}
