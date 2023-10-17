import { Injectable } from '@nestjs/common';
import { BikeBasePrice } from '../entity/bike-base-price.entity';
import { BikeBasePriceRepository } from './bike-base-price.repository';

@Injectable()
export class BikeBasePriceService {
  constructor(private bikeBasePriceRepository: BikeBasePriceRepository) {}

  async createBikeBasePrice(
    data: Partial<BikeBasePrice>,
  ): Promise<BikeBasePrice> {
    return await this.bikeBasePriceRepository.createBikeBasePrice(data);
  }

  async updateBikeBasePrice(
    basePriceId: number,
    updateData: Partial<BikeBasePrice>,
  ): Promise<any> {
    try {
      const basePrice = await this.bikeBasePriceRepository.findOne(basePriceId);
      if (!basePrice) {
        throw new Error('Base price not found');
      }
      Object.assign(basePrice, updateData);
      return await this.bikeBasePriceRepository.save(basePrice);
    } catch (error) {
      // Handle error appropriately for your application
      console.error(error);
    }
  }

  async deleteByBikeId(bikeId: number) {
    return await this.bikeBasePriceRepository.deleteByBikeId(bikeId);
  }
}
