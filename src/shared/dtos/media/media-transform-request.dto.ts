import {
  IsString,
  IsInt,
  IsArray,
  ArrayNotEmpty,
  ValidateNested,
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
  @ValidateNested()
  @Type(() => MediaURLDto)
  featuredImage: MediaURLDto;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => MediaURLDto)
  galleryImages: MediaURLDto[];
}
