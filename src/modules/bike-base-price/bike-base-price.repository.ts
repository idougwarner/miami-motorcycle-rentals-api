import { InjectRepository } from '@nestjs/typeorm';
import { EntityRepository, Repository } from 'typeorm';
import { BikeBasePrice } from '../entity/bike-base-price.entity';

@EntityRepository(BikeBasePrice)
export class BikeBasePriceRepository {
  constructor(
    @InjectRepository(BikeBasePrice)
    private readonly basePriceRepository: Repository<BikeBasePrice>,
  ) {}

  async createBikeBasePrice(
    data: Partial<BikeBasePrice>,
  ): Promise<BikeBasePrice> {
    const basePrice = this.basePriceRepository.create(data);
    return await this.basePriceRepository.save(basePrice);
  }

  async findOne(id: number) {
    return await this.basePriceRepository.findOne(id);
  }

  async save(data: BikeBasePrice) {
    return await this.basePriceRepository.save(data);
  }

  async deleteByBikeId(bikeId: number) {
    return await this.basePriceRepository.delete({ bikeId });
  }
}
