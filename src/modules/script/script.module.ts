import { Module } from '@nestjs/common';
import { BikeService } from '../bike/bike.service';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bike } from '../entity/bike.entity';
import { BikeRepository } from '../bike/bike.repository';
import { BikeInsurancePlanModule } from '../bike-insurance-plan/bike-insurance-plan.module';
import { ScriptController } from './script.controller';
@Module({
  imports: [
    HttpModule,
    BikeInsurancePlanModule,
    TypeOrmModule.forFeature([Bike]),
  ],
  providers: [BikeService, BikeRepository],
  controllers: [ScriptController],
  exports: [BikeService],
})
export class ScriptModule {}
