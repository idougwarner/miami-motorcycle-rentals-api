import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { InsuranceEnum } from '../../common';

export class InsuranceRequestDto {
  @ApiProperty({
    type: 'enum',
    enum: InsuranceEnum,
    example: InsuranceEnum.MINIMUM,
  })
  @IsNotEmpty()
  type: InsuranceEnum;

  @ApiProperty()
  @IsNotEmpty()
  minAge: number;

  @ApiProperty()
  @IsNotEmpty()
  maxAge: number;

  @ApiProperty()
  @IsNotEmpty()
  dailyRate: number;

  @ApiProperty()
  @IsNotEmpty()
  deposit: number;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  popUpDescription: string;
}
