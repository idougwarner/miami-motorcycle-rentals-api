import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BikeType } from '../entity/bike-type.entity';

@Injectable()
export class BikeTypeRepository {
  constructor(
    @InjectRepository(BikeType)
    private readonly bikeRepository: Repository<BikeType>,
  ) {}

  async findAll(): Promise<BikeType[]> {
    return this.bikeRepository.find({
      relations: ['mediaItem'],
    });
  }

  async find(id: number): Promise<BikeType> {
    return this.bikeRepository.findOne(id, {
      relations: ['mediaItem'],
    });
  }
}
