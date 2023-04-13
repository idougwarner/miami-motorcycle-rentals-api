import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BikeBrandRepository } from './bike-brand.repository';
import { BikeBrandGetResponseDto } from 'src/shared/dtos/bike-brand/bike-brand-get-response.dto';
@Injectable()
export class BikeBrandService {
  constructor(private bikeBrandRepository: BikeBrandRepository) {}

  async getAll(): Promise<BikeBrandGetResponseDto[]> {
    const bikeBrands = await this.bikeBrandRepository.findAll();
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
}
