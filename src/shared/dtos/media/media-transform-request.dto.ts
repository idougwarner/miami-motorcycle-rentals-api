import {
  IsString,
  IsInt,
  IsArray,
  ArrayNotEmpty,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class MediaURLDto {
  @IsInt()
  id: number;

  @IsString()
  filename: string;

  @IsString()
  mediaUrl: string;

  @IsString()
  mimeType: string;
}

export class RelatedBikesDto {
  @IsInt()
  relatedBikeId: number;
}

export class MediaTransformRequestDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => MediaURLDto)
  featuredImage?: MediaURLDto;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => MediaURLDto)
  galleryImages?: MediaURLDto[];
}
