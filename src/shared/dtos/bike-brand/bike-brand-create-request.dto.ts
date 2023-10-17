import { IsBoolean, IsInt, IsString, MaxLength } from 'class-validator';

export class BikeBrandCreateRequestDto {
  @IsString()
  @MaxLength(100)
  name: string;

  @IsString()
  @MaxLength(100)
  slug: string;

  @IsInt()
  mediaItemId: number;

  @IsBoolean()
  isPopular: boolean;

  @IsString()
  revision: string;
}
