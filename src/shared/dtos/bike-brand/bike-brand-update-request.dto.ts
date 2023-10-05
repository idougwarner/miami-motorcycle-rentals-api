import { IsEnum, IsInt, IsString, MaxLength } from 'class-validator';
import { BikeStatus } from 'src/shared/common';

export class BikeBrandUpdateRequestDto {
  @IsString()
  @MaxLength(100)
  name: string;

  @IsString()
  @MaxLength(100)
  slug: string;

  @IsInt()
  mediaItemId: number;

  @IsEnum(BikeStatus)
  status: BikeStatus;

  @IsString()
  revision: string;
}
