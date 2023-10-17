import { InjectRepository } from '@nestjs/typeorm';
import { EntityRepository, Repository } from 'typeorm';
import { RelatedBike } from '../entity/related-bike.entity';

@EntityRepository(RelatedBike)
export class RelatedBikeRepository {
  constructor(
    @InjectRepository(RelatedBike)
    private readonly relatedBikeRepository: Repository<RelatedBike>,
  ) {}

  async createRelatedBike(data: Partial<RelatedBike>): Promise<RelatedBike> {
    const relatedBike = this.relatedBikeRepository.create(data);
    return await this.relatedBikeRepository.save(relatedBike);
  }

  async findOne(id: number) {
    return await this.relatedBikeRepository.findOne(id);
  }

  async save(data: RelatedBike) {
    return await this.relatedBikeRepository.save(data);
  }

  async deleteByBikeId(bikeId: number) {
    return await this.relatedBikeRepository.delete({ bikeId });
  }
}
