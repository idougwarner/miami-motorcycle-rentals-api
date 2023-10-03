import { Injectable } from '@nestjs/common';
import { RelatedBike } from '../entity/related-bike.entity';
import { RelatedBikeRepository } from './related-bike.repository';

@Injectable()
export class RelatedBikeService {
  constructor(private relatedBikeRepository: RelatedBikeRepository) {}

  async createRelatedBike(data: Partial<RelatedBike>): Promise<RelatedBike> {
    return await this.relatedBikeRepository.createRelatedBike(data);
  }
}
