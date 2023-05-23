import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BikeType } from '../entity/bike-type.entity';
import { MediaSize } from 'src/shared/common';

@Injectable()
export class BikeTypeRepository {
  constructor(
    @InjectRepository(BikeType)
    private readonly bikeTypeRepository: Repository<BikeType>,
  ) {}

  async findAll(mediaSize?: MediaSize): Promise<BikeType[]> {
    return this.bikeTypeRepository
      .createQueryBuilder('bikeType')
      .leftJoinAndSelect('bikeType.mediaItem', 'mediaItem')
      .leftJoinAndSelect(
        'mediaItem.transformedMediaItems',
        'transformedMediaItem',
        'transformedMediaItem.mediaSize = :mediaSize',
        { mediaSize: mediaSize },
      )
      .getMany();
  }

  async find(id: number, mediaSize?: MediaSize): Promise<BikeType> {
    return this.bikeTypeRepository
      .createQueryBuilder('bikeType')
      .leftJoinAndSelect('bikeType.mediaItem', 'mediaItem')
      .leftJoinAndSelect(
        'mediaItem.transformedMediaItems',
        'transformedMediaItem',
        'transformedMediaItem.mediaSize = :mediaSize',
        { mediaSize: mediaSize },
      )
      .where({
        id,
      })
      .getOne();
  }
}
