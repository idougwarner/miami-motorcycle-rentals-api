import { Module } from '@nestjs/common';
import { BikeService } from './bike.service';
import { BikeController } from './bike.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bike } from '../entity/bike.entity';
import { BikeRepository } from './bike.repository';
import { BikeInsurancePlanModule } from '../bike-insurance-plan/bike-insurance-plan.module';
@Module({
  imports: [
    HttpModule,
    BikeInsurancePlanModule,
    TypeOrmModule.forFeature([Bike]),
  ],
  providers: [BikeService, BikeRepository],
  controllers: [BikeController],
  exports: [BikeService],
})
export class BikeModule {}
