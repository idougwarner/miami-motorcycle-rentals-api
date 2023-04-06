import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class VerifyOrderRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(5, {
    message: 'Verification code must be minimum of 5 characters',
  })
  @MaxLength(5, {
    message: 'Verification code must be maximum of 5 characters',
  })
  verificationCode: string;
}
