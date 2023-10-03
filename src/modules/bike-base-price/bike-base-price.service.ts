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
}
