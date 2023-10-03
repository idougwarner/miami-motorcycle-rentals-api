import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RelatedBike } from '../entity/related-bike.entity';
import { RelatedBikeRepository } from './related-bike.repository';
import { RelatedBikeService } from './related-bike.service';

@Module({
  imports: [TypeOrmModule.forFeature([RelatedBike])],
  providers: [RelatedBikeService, RelatedBikeRepository],
  exports: [RelatedBikeService],
})
export class RelatedBikeModule {}
