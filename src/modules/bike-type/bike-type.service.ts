import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BikeTypeRepository } from './bike-type.repository';
import { BikeTypeGetResponseDto } from 'src/shared/dtos/bike-type/bike-type-get-response.dto';
import { MediaSize } from 'src/shared/common';

@Injectable()
export class BikeTypeService {
  constructor(private bikeTypeRepository: BikeTypeRepository) {}

  async getAll(): Promise<BikeTypeGetResponseDto[]> {
    const bikeTypes = await this.bikeTypeRepository.findAll(
      MediaSize.MediumLarge,
    );
    if (!bikeTypes || bikeTypes?.length === 0) {
      throw new NotFoundException('Bike Types not found');
    }

    return plainToInstance(BikeTypeGetResponseDto, bikeTypes, {
      excludeExtraneousValues: true,
    });
  }

  async getById(id: number): Promise<BikeTypeGetResponseDto> {
    const bikeType = await this.bikeTypeRepository.find(
      id,
      MediaSize.MediumLarge,
    );
    if (!bikeType) {
      throw new NotFoundException('Bike Type not found');
    }

    return plainToInstance(BikeTypeGetResponseDto, bikeType, {
      excludeExtraneousValues: true,
    });
  }
}
