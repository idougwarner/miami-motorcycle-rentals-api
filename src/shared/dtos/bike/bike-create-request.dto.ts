import {
  IsString,
  IsInt,
  MaxLength,
  IsEnum,
  IsArray,
  ArrayNotEmpty,
  ValidateNested,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import { InsuranceEnum } from 'src/shared/common';

export class BikeDto {
  @IsString()
  @MaxLength(100)
  name: string;

  @IsString()
  @MaxLength(100)
  slug: string;

  @IsInt()
  featuredMediaItemId: number;

  @IsString()
  description: string;

  @IsInt()
  typeId: number;

  @IsInt()
  brandId: number;

  @IsString()
  @MaxLength(100)
  model: string;

  @IsInt()
  regularPrice: number;

  @IsInt()
  discountPrice: number;

  @IsString()
  discountPercentage: string;

  @IsString()
  @MaxLength(255)
  distanceIncluded: string;

  @IsString()
  highlights: string;

  @IsString()
  features: string;

  @IsString()
  extras: string;

  @IsString()
  status: 'draft'; // You might want to use an enum if there are other statuses.

  @IsInt()
  position: number;
}

export class OffDaysDto {
  @IsString()
  @MaxLength(255)
  fromDate: string;

  @IsString()
  @MaxLength(255)
  fromTime: string;

  @IsString()
  @MaxLength(255)
  toDate: string;

  @IsString()
  @MaxLength(255)
  toTime: string;

  @IsString()
  @MaxLength(255)
  description: string;
}

export class BasePricesDto {
  @IsString()
  @MaxLength(255)
  fromDate: string;

  @IsString()
  @MaxLength(255)
  fromTime: string;

  @IsString()
  @MaxLength(255)
  toDate: string;

  @IsString()
  @MaxLength(255)
  toTime: string;

  @IsNumber()
  pricePerDay: number;
}

export class InsurancePlansDto {
  @IsInt()
  minAge: number;

  @IsInt()
  maxAge: number;

  @IsEnum(InsuranceEnum)
  type: InsuranceEnum;

  @IsInt()
  dailyRate: number;

  @IsInt()
  deposit: number;

  @IsString()
  @MaxLength(255)
  description: string;

  @IsString()
  @MaxLength(255)
  popUpDescription: string;
}

export class RelatedBikesDto {
  @IsInt()
  relatedBikeId: number;
}

export class BikeCreateRequestDto {
  @ValidateNested()
  @Type(() => BikeDto)
  bike: BikeDto;

  @IsArray()
  galleryImageIds: number[];

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => OffDaysDto)
  offDays: OffDaysDto[];

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => BasePricesDto)
  basePrices: BasePricesDto[];

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => InsurancePlansDto)
  insurancePlans: InsurancePlansDto[];

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => RelatedBikesDto)
  relatedBikes: RelatedBikesDto[];
}
