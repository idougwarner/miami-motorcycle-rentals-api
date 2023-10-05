import { IsInt, IsOptional, IsString, MaxLength } from 'class-validator';
import {
  FileSystemStoredFile,
  HasMimeType,
  IsFile,
  IsFiles,
  MaxFileSize,
} from 'nestjs-form-data';

export class CreateImageDto {
  @IsInt()
  width: number;

  @IsInt()
  height: number;

  @IsInt()
  filesize: number;

  @IsString()
  @MaxLength(30)
  mimeType: string;

  @IsString()
  @MaxLength(255)
  filename: string;

  @IsString()
  @MaxLength(255)
  title: string;

  @IsString()
  @MaxLength(255)
  alt: string;

  @IsString()
  type: string;

  @IsOptional()
  oldImageIds?: number[];
}

export class MediaCreateRequestDto {
  @IsOptional()
  featureImage?: any;

  @IsOptional()
  galleryImages?: any;

  @IsOptional()
  @IsFile()
  @MaxFileSize(1e6)
  @HasMimeType(['image/jpeg', 'image/png'])
  featureImageFile?: FileSystemStoredFile;

  @IsOptional()
  @IsFiles()
  @MaxFileSize(1e6, { each: true })
  @HasMimeType(['image/jpeg', 'image/png'], { each: true })
  galleryImageFiles?: FileSystemStoredFile[];
}
