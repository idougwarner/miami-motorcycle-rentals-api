import { ApiResponseProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { BikeAccessoryOrderResponse, BaseBikeOrderResponse } from '..';

export class UpdateBikeOrderResponse extends BaseBikeOrderResponse {
  @ApiResponseProperty()
  @Expose()
  verificationCode: string;

  @ApiResponseProperty()
  @Expose()
  orderTotalAmount: number;

  @ApiResponseProperty()
  @Expose()
  pickUpDate: string;

  @ApiResponseProperty()
  @Expose()
  dropOffDate: string;

  @ApiResponseProperty()
  @Expose()
  pickUpTime: string;

  @ApiResponseProperty()
  @Expose()
  dropOffTime: string;

  @ApiResponseProperty()
  @Expose()
  insuranceName: string;

  @ApiResponseProperty()
  @Expose()
  roadAssistance: boolean;

  @ApiResponseProperty()
  @Expose()
  isVerified: boolean;

  @ApiResponseProperty()
  @Expose()
  status: string;

  @ApiResponseProperty()
  @Expose()
  insuranceDeposit: number;

  @ApiResponseProperty()
  @Expose()
  insuranceDailyRate: number;

  @ApiResponseProperty({ type: () => [BikeAccessoryOrderResponse] })
  @ValidateNested({ each: true })
  @Type(() => BikeAccessoryOrderResponse)
  @Expose()
  accessories!: BikeAccessoryOrderResponse[];
}
