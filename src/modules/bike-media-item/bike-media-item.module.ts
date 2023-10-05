import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BikeMediaItem } from '../entity/bike-media-item.entity';
import { BikeMediaItemService } from './bike-media-item.service';
@Module({
  imports: [TypeOrmModule.forFeature([BikeMediaItem])],
  providers: [BikeMediaItemService],
  exports: [BikeMediaItemService],
})
export class BikeMediaItemModule {}
