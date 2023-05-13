import { ApiResponseProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { BaseResponseDto } from '..';
import { BikeInsuranceResponseDto } from './bike-insurance.response.dto';

export class BikeResponse extends BaseResponseDto {
  @ApiResponseProperty()
  @Expose()
  id: number;

  @Expose()
  @Transform((bike) => bike?.obj?.insurances)
  @ApiResponseProperty({
    type: [BikeInsuranceResponseDto],
  })
  insurances: BikeInsuranceResponseDto[];
}
