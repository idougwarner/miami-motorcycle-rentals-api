import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BikeBrandRepository } from './bike-brand.repository';
import { BikeBrandGetResponseDto } from 'src/shared/dtos/bike-brand/bike-brand-get-response.dto';
import { BikeBrandCreateRequestDto } from 'src/shared/dtos/bike-brand/bike-brand-create-request.dto';
import { BikeBrandCreateResponseDto } from 'src/shared/dtos/bike-brand/bike-brand-create-response.dto';
import { BikeBrandUpdateRequestDto } from 'src/shared/dtos/bike-brand/bike-brand-update-request.dto';
import { BikeBrandUpdateResponseDto } from 'src/shared/dtos/bike-brand/bike-brand-update-response.dto';
import { MediaItemService } from '../media-item/media-item.service';
@Injectable()
export class BikeBrandService {
  constructor(
    private bikeBrandRepository: BikeBrandRepository,
    private mediaItemService: MediaItemService,
  ) {}

  async getAll(isAll: number): Promise<BikeBrandGetResponseDto[]> {
    const bikeBrands = await this.bikeBrandRepository.findAll(
      isAll
        ? {}
        : {
            isPopular: true,
          },
    );
    if (!bikeBrands || bikeBrands?.length === 0) {
      throw new NotFoundException('Brands not found');
    }

    return plainToInstance(BikeBrandGetResponseDto, bikeBrands, {
      excludeExtraneousValues: true,
    });
  }

  async getById(id: number): Promise<BikeBrandGetResponseDto> {
    const bikeBrand = await this.bikeBrandRepository.find(id);
    if (!bikeBrand) {
      throw new NotFoundException('Brand not found');
    }

    return plainToInstance(BikeBrandGetResponseDto, bikeBrand, {
      excludeExtraneousValues: true,
    });
  }

  async createBrand(
    createBrandDto: BikeBrandCreateRequestDto,
  ): Promise<BikeBrandCreateResponseDto> {
    const brand = this.bikeBrandRepository.create(createBrandDto);

    return plainToInstance(BikeBrandCreateResponseDto, brand, {
      excludeExtraneousValues: true,
    });
  }

  async updateBrand(
    id: number,
    updateBrandDto: BikeBrandUpdateRequestDto,
  ): Promise<BikeBrandUpdateResponseDto> {
    const brand = await this.bikeBrandRepository.find(id);

    if (!brand) {
      throw new NotFoundException('Brand not found');
    }

    const mediaItem = await this.mediaItemService.getById(
      updateBrandDto.mediaItemId,
    );
    if (!mediaItem) {
      throw new NotFoundException('MediaItem not found');
    }

    Object.assign(brand, updateBrandDto);
    brand.mediaItem = mediaItem;
    const updatedBrand = await this.bikeBrandRepository.save(brand);

    return plainToInstance(BikeBrandUpdateResponseDto, updatedBrand, {
      excludeExtraneousValues: true,
    });
  }
}
