import { ApiResponseProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserDetailsResponseDto {
  @ApiResponseProperty()
  @Expose()
  id!: number;

  @ApiResponseProperty()
  @Expose()
  email!: string;

  @ApiResponseProperty()
  @Expose()
  firstName!: string;

  @ApiResponseProperty()
  @Expose()
  lastName!: string;

  @ApiResponseProperty()
  @Expose()
  role!: string;

  @ApiResponseProperty()
  @Expose()
  isVerified!: string;

  @ApiResponseProperty()
  @Expose()
  phoneNumber!: string;

  @ApiResponseProperty()
  @Expose()
  mobileNumber!: string;
}
