import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { GearTypes } from '../../../../../shared/calculations';

export class CreateStripePaymentIntentRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  bikeId: number;

  @ApiProperty()
  @IsNotEmpty()
  personName: string;

  @ApiProperty()
  @IsNotEmpty()
  pickUpDate: string;

  @ApiProperty()
  @IsNotEmpty()
  pickUpTime: string;

  @ApiProperty()
  @IsNotEmpty()
  dropOffDate: string;

  @ApiProperty()
  @IsNotEmpty()
  dropOffTime: string;

  @ApiProperty()
  @IsNotEmpty()
  duration: number;

  @ApiProperty()
  @IsNotEmpty()
  bikeInsuranceId: number;

  @ApiProperty()
  @IsNotEmpty()
  roadAssistance: boolean;

  @ApiProperty({
    enum: GearTypes,
    type: [GearTypes],
  })
  @IsNotEmpty()
  addOns: GearTypes[];

  @ApiProperty()
  @IsNotEmpty()
  bikePrice: number;
}
