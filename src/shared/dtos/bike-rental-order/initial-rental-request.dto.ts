import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsNotEmpty } from 'class-validator';

export class InitialBikeRentalRequest {
  @ApiProperty()
  @IsNotEmpty()
  bikeId: number;

  @ApiProperty()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  lastName!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @ApiProperty()
  @IsNotEmpty()
  phoneNumber!: string;

  @ApiProperty({
    example: '2022-01-31',
  })
  @IsNotEmpty()
  @IsDateString()
  dateOfBirth!: string;

  @ApiProperty()
  @IsNotEmpty()
  country!: string;

  @ApiProperty()
  @IsNotEmpty()
  city!: string;

  @ApiProperty()
  @IsNotEmpty()
  streetAddress!: string;

  @ApiProperty()
  aptSuite!: string;

  @ApiProperty({ required: false })
  state: string;

  @ApiProperty({ required: false })
  postalCode: string;
}
