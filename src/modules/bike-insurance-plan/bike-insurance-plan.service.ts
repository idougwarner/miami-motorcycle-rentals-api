import { Injectable, NotFoundException } from '@nestjs/common';
import { InsuranceRequestDto } from '../../shared/dtos';
import { BikeInsurancePlan } from '../entity/bike-insurance-plan.entity';
import { BikeInsurancePlanRepository } from './bike-insurance-plan.repository';

@Injectable()
export class BikeInsurancePlanService {
  constructor(
    private bikeInsurancePlanRepository: BikeInsurancePlanRepository,
  ) {}

  async getBikeInsurancePlanById(
    insuranceId: number,
  ): Promise<BikeInsurancePlan> {
    const insurance =
      await this.bikeInsurancePlanRepository.getBikeInsurancePlanById(
        insuranceId,
      );

    if (!insurance) {
      throw new NotFoundException('Insurance Not Found.');
    }
    return insurance;
  }

  async updateInsurance(
    insuranceRequest: InsuranceRequestDto,
    insurancePlan: BikeInsurancePlan,
    bikeId: number,
  ) {
    insurancePlan.type = insuranceRequest.type;
    insurancePlan.deposit = insuranceRequest.deposit;
    insurancePlan.dailyRate = insuranceRequest.dailyRate;
    insurancePlan.description = insuranceRequest.description;
    insurancePlan.popUpDescription = insuranceRequest.popUpDescription;
    insurancePlan.minAge = insuranceRequest.minAge;
    insurancePlan.maxAge = insuranceRequest.maxAge;
    await this.bikeInsurancePlanRepository.saveInsurance(insurancePlan);
    await this.bikeInsurancePlanRepository.updateBikeInsuranceDescription(
      insurancePlan,
      bikeId,
    );
    return insurancePlan;
  }
}
