import { ApiResponseProperty } from '@nestjs/swagger';
import { BaseResponseDto } from '../base-response.dto';
import { Expose } from 'class-transformer';
import { BikeStatus } from 'src/shared/common';

export class BikeBrandUpdateResponseDto extends BaseResponseDto {
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
  status: boolean;

  @ApiResponseProperty()
  @Expose()
  revision: string;
}
