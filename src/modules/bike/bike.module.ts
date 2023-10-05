import { Module } from '@nestjs/common';
import { BikeService } from './bike.service';
import { BikeController } from './bike.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bike } from '../entity/bike.entity';
import { BikeRepository } from './bike.repository';
import { BikeInsurancePlanModule } from '../bike-insurance-plan/bike-insurance-plan.module';
import { BikeOffDayModule } from '../bike-off-day/bike-off-day.module';
import { BikeBasePriceModule } from '../bike-base-price/bike-base-price.module';
import { RelatedBikeModule } from '../related-bike/related-bike.module';
import { BikeMediaItemModule } from '../bike-media-item/bike-media-item.module';
@Module({
  imports: [
    HttpModule,
    BikeInsurancePlanModule,
    BikeOffDayModule,
    BikeBasePriceModule,
    RelatedBikeModule,
    BikeMediaItemModule,
    TypeOrmModule.forFeature([Bike]),
  ],
  providers: [BikeService, BikeRepository],
  controllers: [BikeController],
  exports: [BikeService],
})
export class BikeModule {}
