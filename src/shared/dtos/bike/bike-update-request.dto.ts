import {
  IsOptional,
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
import {
  BasePricesDto,
  BikeDto,
  InsurancePlansDto,
  OffDaysDto,
  RelatedBikesDto,
} from './bike-create-request.dto';

export class BikeUpdateDto extends BikeDto {
  @IsOptional()
  @IsInt()
  id?: number;
}

export class OffDaysUpdateDto extends OffDaysDto {
  @IsOptional()
  @IsInt()
  id?: number;
}

export class BasePricesUpdateDto extends BasePricesDto {
  @IsOptional()
  @IsInt()
  id?: number;
}

export class InsurancePlansUpdateDto extends InsurancePlansDto {
  @IsOptional()
  @IsInt()
  id?: number;
}

export class RelatedBikesUpdateDto extends RelatedBikesDto {
  @IsOptional()
  @IsInt()
  id?: number;
}

export class BikeUpdateRequestDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => BikeUpdateDto)
  bike?: BikeUpdateDto;

  @IsOptional()
  @IsArray()
  galleryImageIds?: number[];

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => OffDaysUpdateDto)
  offDays?: OffDaysUpdateDto[];

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => BasePricesUpdateDto)
  basePrices?: BasePricesUpdateDto[];

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => InsurancePlansUpdateDto)
  insurancePlans?: InsurancePlansUpdateDto[];

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => RelatedBikesUpdateDto)
  relatedBikes?: RelatedBikesUpdateDto[];
}
