import { ApiResponseProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BaseBikeOrderResponse } from '..';

export class InitialBikeOrderResponse extends BaseBikeOrderResponse {
  @ApiResponseProperty()
  @Expose()
  isExistingCustomer: boolean;
}
