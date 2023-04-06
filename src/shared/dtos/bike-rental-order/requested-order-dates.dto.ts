import { ApiResponseProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import moment from 'moment';

export class RequestedOrderDatesResponseDto {
  @ApiResponseProperty()
  @Expose()
  @Transform((value) => {
    var userTimezoneOffset = value?.obj?.pickUpDate.getTimezoneOffset() * 60000;
    return new Date(value?.obj?.pickUpDate.getTime() - userTimezoneOffset)
      .toISOString()
      .substring(0, 10);
  })
  pickUpDate: string;

  @ApiResponseProperty()
  @Expose()
  @Transform((value) => {
    var userTimezoneOffset =
      value?.obj?.dropOffDate.getTimezoneOffset() * 60000;
    return new Date(value?.obj?.dropOffDate.getTime() - userTimezoneOffset)
      .toISOString()
      .substring(0, 10);
  })
  dropOffDate: string;

  @ApiResponseProperty()
  @Expose()
  pickUpTime: string;

  @ApiResponseProperty()
  @Expose()
  dropOffTime: string;
}
