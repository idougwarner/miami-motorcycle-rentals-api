import { ApiResponseProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BaseResponseDto } from '..';
import { CoverageTypes } from '../../../shared/calculations';

export class BikeInsuranceResponseDto extends BaseResponseDto {
  @ApiResponseProperty()
  @Expose()
  minAge: number;

  @ApiResponseProperty()
  @Expose()
  maxAge: number;

  @ApiResponseProperty({
    type: 'enum',
    enum: CoverageTypes,
    example: CoverageTypes.MINIMUM,
  })
  @Expose()
  type: CoverageTypes;

  @ApiResponseProperty()
  @Expose()
  dailyRate: number;

  @ApiResponseProperty()
  @Expose()
  deposit: number;

  @ApiResponseProperty()
  @Expose()
  description: string;

  @ApiResponseProperty()
  @Expose()
  popUpDescription: string;
}
