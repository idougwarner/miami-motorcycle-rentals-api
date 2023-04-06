import { ApiResponseProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { BaseResponseDto } from '..';

export class BaseBikeOrderResponse extends BaseResponseDto {
  @ApiResponseProperty()
  @Expose()
  @Transform((order) => order?.obj?.user?.id)
  userId: number;


  @ApiResponseProperty()
  @Expose()
  @Transform((order) => order?.obj?.bikeId)
  bikeId: number;

  @ApiResponseProperty()
  @Expose()
  @Transform((order) => order?.obj?.user?.firstName)
  firstName: string;

  @ApiResponseProperty()
  @Expose()
  @Transform((order) => order?.obj?.user?.lastName)
  lastName!: string;

  @ApiResponseProperty()
  @Expose()
  @Transform((order) => order?.obj?.user?.email)
  email!: string;

  @ApiResponseProperty()
  @Expose()
  @Transform((order) => order?.obj?.user?.phoneNumber)
  phoneNumber!: string;

  @ApiResponseProperty()
  @Expose()
  @Transform((order) => order?.obj?.user?.dateOfBirth)
  dateOfBirth!: string;

  @ApiResponseProperty()
  @Expose()
  @Transform((order) => order?.obj?.user?.country)
  country!: string;

  @ApiResponseProperty()
  @Expose()
  @Transform((order) => order?.obj?.user?.city)
  city!: string;

  @ApiResponseProperty()
  @Expose()
  @Transform((order) => order?.obj?.user?.streetAddress)
  streetAddress!: string;

  @ApiResponseProperty()
  @Expose()
  @Transform((order) => order?.obj?.user?.aptSuite)
  aptSuite!: string;

  @ApiResponseProperty()
  @Expose()
  @Transform((order) => order?.obj?.user?.state)
  state!: string;

  @ApiResponseProperty()
  @Expose()
  @Transform((order) => order?.obj?.user?.postalCode)
  postalCode!: string;

  @ApiResponseProperty()
  @Expose()
  bikeModel: string;

  @ApiResponseProperty()
  @Expose()
  bikeBrand: string;

  @ApiResponseProperty()
  @Expose()
  bikeImage: string;

  @ApiResponseProperty()
  @Expose()
  dailyBikePrice: number;
}
