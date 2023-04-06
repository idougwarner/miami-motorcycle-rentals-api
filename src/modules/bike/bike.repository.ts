import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bike } from '../entity/bike.entity';

@Injectable()
export class BikeRepository {
  constructor(
    @InjectRepository(Bike)
    private readonly bikeRepository: Repository<Bike>,
  ) {}

  async getBikeDetailsByWordpressId(id: number): Promise<Bike> {
    return this.bikeRepository.findOne({
      where: {
        wpBikeId: id,
      },
      relations: ['insurances'],
    });
  }
}
