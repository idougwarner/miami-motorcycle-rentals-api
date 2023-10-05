import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, Repository } from 'typeorm';
import { BikeBrand } from '../entity/bike-brands.entity';

@Injectable()
export class BikeBrandRepository {
  constructor(
    @InjectRepository(BikeBrand)
    private readonly bikeBrandRepository: Repository<BikeBrand>,
  ) {}

  async findAll(where: FindConditions<BikeBrand> = {}): Promise<BikeBrand[]> {
    return this.bikeBrandRepository.find({
      where,
      relations: ['mediaItem'],
    });
  }

  async find(id: number): Promise<BikeBrand> {
    return this.bikeBrandRepository.findOne(id, { relations: ['mediaItem'] });
  }

  async create(data: Partial<BikeBrand>) {
    const brand = this.bikeBrandRepository.create(data);
    return await this.save(brand);
  }

  async save(data: BikeBrand) {
    return await this.bikeBrandRepository.save(data);
  }
}
