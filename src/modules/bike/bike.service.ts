import { Injectable, NotFoundException } from '@nestjs/common';
import { environment } from '../../environments/environment';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import {
  BikeInsuranceResponseDto,
  InsuranceRequestDto,
  BikeForOrderResponse,
} from '../../shared/dtos';
import { plainToClass, plainToInstance } from 'class-transformer';
import { BikeRepository } from './bike.repository';
import { BikeResponse } from '../../shared/dtos/bike/bike-response.dto';
import { Bike } from '../entity/bike.entity';
import { BikeInsurancePlanService } from '../bike-insurance-plan/bike-insurance-plan.service';
import { FindConditions } from 'typeorm';
import { BikeGetAllResponseDto } from 'src/shared/dtos/bike/bike-get-all-response.dto';
import { BikeGetResponseDto } from 'src/shared/dtos/bike/bike-get-response.dto';
import { BikeStatus } from '../../shared/common';
@Injectable()
export class BikeService {
  miamiBikeWpUrl = environment.wpJsonBaseUrl;

  constructor(
    private httpService: HttpService,
    private bikeRepository: BikeRepository,
    private bikeInsurancePlanService: BikeInsurancePlanService,
  ) {}

  async findAll(where: FindConditions<Bike> = {}): Promise<Bike[]> {
    return await this.bikeRepository.findAll(where);
  }

  async getAllBikes(
    type_id?: number,
    brand_id?: number,
  ): Promise<BikeGetAllResponseDto[]> {
    const where: FindConditions<Bike> = {};
    if (type_id) where.typeId = type_id;
    if (brand_id) where.brandId = brand_id;
    where.status = BikeStatus.Publish;

    const bikes = await this.findAll(where);
    if (!bikes || bikes?.length === 0) {
      throw new NotFoundException('Bikes not found');
    }

    return plainToInstance(BikeGetAllResponseDto, bikes, {
      excludeExtraneousValues: true,
    });
  }

  async getDetailsById(id: number): Promise<BikeGetResponseDto> {
    const bike = await this.bikeRepository.find(id, {
      relations: ['brand', 'featuredMediaItem'],
    });
    if (!bike) {
      throw new NotFoundException('Bike not found');
    }

    return plainToInstance(BikeGetResponseDto, bike, {
      excludeExtraneousValues: true,
    });
  }

  async getMediaItemsById(id: number) {
    const bike = await this.bikeRepository.getMediaItemsById(id);
    if (!bike) {
      throw new NotFoundException('Bike not found');
    }

    return bike.mediaItems || [];
  }

  async getBikeDetailsForOrder(id: number): Promise<BikeForOrderResponse> {
    // const url = `${this.miamiBikeWpUrl}/wp-json/wp/v2/motorcycle-rental/${wpId}`;
    // const { data } = await firstValueFrom(this.httpService.get(url));
    const bike = this.getDetailsById(id);
    return plainToClass(BikeForOrderResponse, bike, {
      excludeExtraneousValues: true,
    });
  }

  async updateBikeInsurance(
    id: number,
    insuranceRequest: InsuranceRequestDto,
  ): Promise<BikeInsuranceResponseDto> {
    const bike = await this.getWithInsuranceById(id);

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

  async getWithInsuranceById(id: number): Promise<Bike> {
    const bike = await this.bikeRepository.find(id, {
      relations: ['insurances'],
    });
    if (!bike) {
      throw new NotFoundException('Bike not found');
    }

    return bike;
  }
}
