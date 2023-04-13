import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, Repository } from 'typeorm';
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

  async findAll(where: FindConditions<Bike>): Promise<Bike[]> {
    return this.bikeRepository.find({
      where,
      relations: ['brand', 'featuredMediaItem'],
    });
  }

  async find(id: number): Promise<Bike> {
    return this.bikeRepository.findOne(id, {
      relations: ['brand', 'featuredMediaItem'],
    });
  }

  async getMediaItemsById(id: number) {
    return this.bikeRepository.findOne(id, { relations: ['mediaItems'] });
  }
}
