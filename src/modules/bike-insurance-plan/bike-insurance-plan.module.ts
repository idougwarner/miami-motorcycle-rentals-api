import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BikeInsurancePlan } from '../entity/bike-insurance-plan.entity';
import { BikeInsurancePlanRepository } from './bike-insurance-plan.repository';
import { BikeInsurancePlanService } from './bike-insurance-plan.service';
@Module({
  imports: [TypeOrmModule.forFeature([BikeInsurancePlan])],
  providers: [BikeInsurancePlanService, BikeInsurancePlanRepository],
  exports: [BikeInsurancePlanService],
})
export class BikeInsurancePlanModule {}
