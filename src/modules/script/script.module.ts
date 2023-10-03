import { Module } from '@nestjs/common';
import { BikeService } from '../bike/bike.service';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bike } from '../entity/bike.entity';
import { BikeRepository } from '../bike/bike.repository';
import { BikeInsurancePlanModule } from '../bike-insurance-plan/bike-insurance-plan.module';
import { ScriptController } from './script.controller';
import { BikeOffDayModule } from '../bike-off-day/bike-off-day.module';
import { BikeBasePriceModule } from '../bike-base-price/bike-base-price.module';
import { RelatedBikeService } from '../related-bike/related-bike.service';
import { RelatedBikeModule } from '../related-bike/related-bike.module';
@Module({
  imports: [
    HttpModule,
    BikeInsurancePlanModule,
    BikeOffDayModule,
    BikeBasePriceModule,
    RelatedBikeModule,
    TypeOrmModule.forFeature([Bike]),
  ],
  providers: [BikeService, BikeRepository],
  controllers: [ScriptController],
  exports: [BikeService],
})
export class ScriptModule {}
