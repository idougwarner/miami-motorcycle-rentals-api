import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BikeInsurancePlan } from '../entity/bike-insurance-plan.entity';

@Injectable()
export class BikeInsurancePlanRepository {
  constructor(
    @InjectRepository(BikeInsurancePlan)
    private readonly bikeInsurancePlanRepository: Repository<BikeInsurancePlan>,
  ) {}

  async saveInsurance(
    insurancePlan: Partial<BikeInsurancePlan>,
  ): Promise<BikeInsurancePlan> {
    await this.bikeInsurancePlanRepository.save(insurancePlan);

    return this.bikeInsurancePlanRepository.findOne({
      where: { id: insurancePlan.id },
    });
  }

  async updateBikeInsuranceDescription(
    insurancePlan: BikeInsurancePlan,
    bikeId: number,
  ) {
    await this.bikeInsurancePlanRepository
      .createQueryBuilder()
      .update()
      .set({
        description: insurancePlan.description,
        popUpDescription: insurancePlan.popUpDescription,
      })
      .where('bike_id = :bikeId', { bikeId })
      .execute();
  }

  async getBikeInsurancePlanById(insuranceId: number) {
    return this.bikeInsurancePlanRepository.findOne({
      where: { id: insuranceId },
      relations: ['bike'],
    });
  }
}
