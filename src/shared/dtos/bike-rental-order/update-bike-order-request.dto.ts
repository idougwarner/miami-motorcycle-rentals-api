import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CoverageTypes } from '../../../../../shared/calculations';

export class UpdateBikeRentalRequest {
  @ApiProperty({ example: '2022-01-31' })
  @IsNotEmpty()
  @IsDateString()
  pickUpDate: string;

  @ApiProperty({ example: '08:00' })
  @IsNotEmpty()
  pickUpTime: string;

  @ApiProperty({ example: '2022-01-31' })
  @IsNotEmpty()
  @IsDateString()
  dropOffDate: string;

  @ApiProperty({ example: '21:00' })
  @IsNotEmpty()
  dropOffTime: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  roadAssistance: boolean;

  @ApiProperty()
  @IsNotEmpty()
  stripePaymentId: string;

  @ApiProperty({ example: [0, 1, 2] })
  @IsArray()
  accessories!: number[];

  @ApiProperty()
  @IsNotEmpty()
  duration: number;

  @ApiProperty()
  @IsNotEmpty()
  insurancePlanId: number;

  @ApiProperty()
  @IsNotEmpty()
  stripeCustomerId: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(5)
  verificationCode: string;
}
