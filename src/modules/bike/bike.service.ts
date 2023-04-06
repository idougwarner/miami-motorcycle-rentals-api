import { Injectable, NotFoundException } from '@nestjs/common';
import { environment } from '../../environments/environment';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import {
  BikeInsuranceResponseDto,
  InsuranceRequestDto,
  WpBikeResponse,
} from '../../shared/dtos';
import { plainToClass } from 'class-transformer';
import { BikeRepository } from './bike.repository';
import { BikeResponse } from '../../shared/dtos/bike/bike-response.dto';
import { Bike } from '../entity/bike.entity';
import { BikeInsurancePlanService } from '../bike-insurance-plan/bike-insurance-plan.service';
@Injectable()
export class BikeService {
  miamiBikeWpUrl = environment.wpJsonBaseUrl;

  constructor(
    private httpService: HttpService,
    private bikeRepository: BikeRepository,
    private bikeInsurancePlanService: BikeInsurancePlanService,
  ) {}

  async getWpBikeDetails(wpId: number): Promise<WpBikeResponse> {
    const url = `${this.miamiBikeWpUrl}/wp-json/wp/v2/motorcycle-rental/${wpId}`;
    const { data } = await firstValueFrom(this.httpService.get(url));
    return plainToClass(WpBikeResponse, data, {
      excludeExtraneousValues: true,
    });
  }

  async getBikeDetailsByWordpressId(wpId: number): Promise<BikeResponse> {
    const bike = this.getBikeByWordPressId(wpId);

    return plainToClass(BikeResponse, bike, {
      excludeExtraneousValues: true,
    });
  }

  async updateBikeInsurance(
    wpId: number,
    insuranceRequest: InsuranceRequestDto,
  ): Promise<BikeInsuranceResponseDto> {
    const bike = await this.getBikeByWordPressId(wpId);

    const insurancePlan = bike.insurances.find(
      (data) => data.id === insuranceRequest.id,
    );

    const updatedInsurance =
      await this.bikeInsurancePlanService.updateInsurance(
        insuranceRequest,
        insurancePlan,
        bike.id,
      );

    return plainToClass(BikeInsuranceResponseDto, updatedInsurance, {
      excludeExtraneousValues: true,
    });
  }

  async getBikeByWordPressId(wpId: number): Promise<Bike> {
    const bike = await this.bikeRepository.getBikeDetailsByWordpressId(wpId);
    if (!bike) {
      throw new NotFoundException('Bike not found');
    }

    return bike;
  }
}
