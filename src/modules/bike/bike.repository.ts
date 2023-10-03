import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, Repository } from 'typeorm';
import { Bike } from '../entity/bike.entity';
import { MediaSize } from '../../shared/common';

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

  async findAll(
    where: FindConditions<Bike>,
    mediaSize?: MediaSize,
  ): Promise<Bike[]> {
    return this.bikeRepository
      .createQueryBuilder('bike')
      .leftJoinAndSelect('bike.brand', 'brand')
      .leftJoinAndSelect('bike.featuredMediaItem', 'featuredMediaItem')
      .leftJoinAndSelect(
        'featuredMediaItem.transformedMediaItems',
        'transformedMediaItem',
        'transformedMediaItem.mediaSize = :mediaSize',
        { mediaSize: mediaSize },
      )
      .where(where)
      .orderBy('bike.discountPrice', 'DESC')
      .getMany();
  }

  async find(id: number, options: { relations?: string[] }): Promise<Bike> {
    return this.bikeRepository.findOne(id, options);
  }

  async getMediaItemsById(id: number) {
    return this.bikeRepository.findOne(id, { relations: ['mediaItems'] });
  }

  async createBike(bikeData: Partial<Bike>): Promise<Bike> {
    const bike = this.bikeRepository.create(bikeData);
    return this.bikeRepository.save(bike);
  }
}
