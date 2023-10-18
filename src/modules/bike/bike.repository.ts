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
      .leftJoinAndSelect('bike.bikeBasePrices', 'bikeBasePrices')
      .leftJoinAndSelect('bike.insurances', 'insurances')
      .leftJoinAndSelect('bike.rentalOrders', 'rentalOrders')
      .leftJoinAndSelect(
        'featuredMediaItem.transformedMediaItems',
        'transformedMediaItem',
        'transformedMediaItem.mediaSize = :mediaSize',
        { mediaSize: mediaSize },
      )
      .where(where)
      .orderBy('bike.regularPrice', 'DESC')
      .orderBy('bike.position', 'ASC')
      .getMany();
  }

  async find(id: number, options: { relations?: string[] }): Promise<Bike> {
    return this.bikeRepository.findOne(id, options);
  }

  async findRelatedBikes(bikeId: number) {
    return this.bikeRepository.findOne(bikeId, {
      relations: [
        'relatedBikes',
        'relatedBikes.relatedBike',
        'relatedBikes.relatedBike.featuredMediaItem',
        'relatedBikes.relatedBike.brand',
        'bikesRelatedTo',
        'bikesRelatedTo.bike',
      ],
    });
  }

  async getMediaItemsById(id: number) {
    return this.bikeRepository.findOne(id, { relations: ['mediaItems'] });
  }

  async createBike(bikeData: Partial<Bike>): Promise<Bike> {
    const bike = this.bikeRepository.create(bikeData);
    return this.bikeRepository.save(bike);
  }

  async saveBike(bikeData: Bike) {
    return await this.bikeRepository.save(bikeData);
  }
}
