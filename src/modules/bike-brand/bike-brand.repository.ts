import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BikeBrand } from '../entity/bike-brands.entity';

@Injectable()
export class BikeBrandRepository {
  constructor(
    @InjectRepository(BikeBrand)
    private readonly bikeBrandRepository: Repository<BikeBrand>,
  ) {}

  async findAll(): Promise<BikeBrand[]> {
    return this.bikeBrandRepository.find({
      relations: ['mediaItem'],
    });
  }

  async find(id: number): Promise<BikeBrand> {
    return this.bikeBrandRepository.findOne(id, { relations: ['mediaItem'] });
  }
}
