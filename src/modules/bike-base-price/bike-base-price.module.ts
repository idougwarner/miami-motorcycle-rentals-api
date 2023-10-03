import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BikeBasePrice } from '../entity/bike-base-price.entity';
import { BikeBasePriceService } from './bike-base-price.service';
import { BikeBasePriceRepository } from './bike-base-price.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BikeBasePrice])],
  providers: [BikeBasePriceService, BikeBasePriceRepository],
  exports: [BikeBasePriceService],
})
export class BikeBasePriceModule {}
