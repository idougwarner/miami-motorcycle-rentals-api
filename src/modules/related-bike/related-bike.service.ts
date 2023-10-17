import { Injectable } from '@nestjs/common';
import { RelatedBike } from '../entity/related-bike.entity';
import { RelatedBikeRepository } from './related-bike.repository';

@Injectable()
export class RelatedBikeService {
  constructor(private relatedBikeRepository: RelatedBikeRepository) {}

  async createRelatedBike(data: Partial<RelatedBike>): Promise<RelatedBike> {
    return await this.relatedBikeRepository.createRelatedBike(data);
  }

  async updateRelatedBike(
    relatedBikeId: number,
    updateData: Partial<RelatedBike>,
  ): Promise<any> {
    try {
      const relatedBike = await this.relatedBikeRepository.findOne(
        relatedBikeId,
      );
      if (!relatedBike) {
        throw new Error('Related bike not found');
      }
      Object.assign(relatedBike, updateData);
      return await this.relatedBikeRepository.save(relatedBike);
    } catch (error) {
      // Handle error appropriately for your application
      console.error(error);
    }
  }

  async deleteByBikeId(bikeId: number) {
    return await this.relatedBikeRepository.deleteByBikeId(bikeId);
  }
}
