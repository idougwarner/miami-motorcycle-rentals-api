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
import { BikeStatus, MediaSize } from '../../shared/common';
import { BikeCreateRequestDto } from 'src/shared/dtos/bike/bike-create-request.dto';
import { BikeOffDayService } from '../bike-off-day/bike-off-day.service';
import { BikeBasePriceService } from '../bike-base-price/bike-base-price.service';
import { RelatedBikeService } from '../related-bike/related-bike.service';
@Injectable()
export class BikeService {
  miamiBikeWpUrl = environment.wpJsonBaseUrl;

  constructor(
    private httpService: HttpService,
    private bikeRepository: BikeRepository,
    private bikeInsurancePlanService: BikeInsurancePlanService,
    private bikeOffDayService: BikeOffDayService,
    private bikeBasePriceService: BikeBasePriceService,
    private relatedBikeService: RelatedBikeService,
  ) {}

  async findAll(
    where: FindConditions<Bike> = {},
    mediaSize?: MediaSize,
  ): Promise<Bike[]> {
    return await this.bikeRepository.findAll(where, mediaSize);
  }

  async getAllBikes(
    type_id?: number,
    brand_id?: number,
  ): Promise<BikeGetAllResponseDto[]> {
    const where: FindConditions<Bike> = {};
    if (type_id) where.typeId = type_id;
    if (brand_id) where.brandId = brand_id;
    where.status = BikeStatus.Publish;

    const bikes = await this.findAll(where, MediaSize.MediumLarge);
    if (!bikes || bikes?.length === 0) {
      throw new NotFoundException('Bikes not found');
    }

    return plainToInstance(BikeGetAllResponseDto, bikes, {
      excludeExtraneousValues: true,
    });
  }

  async getDetailsById(id: number): Promise<BikeGetResponseDto> {
    const bike = await this.bikeRepository.find(id, {
      relations: [
        'brand',
        'featuredMediaItem',
        'featuredMediaItem.transformedMediaItems',
      ],
    });
    if (!bike) {
      throw new NotFoundException('Bike not found');
    }

    return plainToInstance(BikeGetResponseDto, bike, {
      excludeExtraneousValues: true,
    });
  }

  async getBikeWithInsurancesById(id: number): Promise<BikeResponse> {
    const bike = this.getWithInsuranceById(id);

    return plainToClass(BikeResponse, bike, {
      excludeExtraneousValues: true,
    });
  }

  async getMediaItemsById(id: number) {
    const bike = await this.bikeRepository.getMediaItemsById(id);
    if (!bike) {
      throw new NotFoundException('Bike not found');
    }

    return (
      bike.mediaItems.map((mediaItem) => {
        return {
          ...mediaItem,
          mediaUrl: mediaItem.mediaUrl.replace(
            /^(https?:\/\/[^\/]*)(.*)$/,
            `${process.env.CLOUDFRONT_BASE_URL}$2`,
          ),
        };
      }) || []
    );
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
    bikeId: number,
    insuranceId: number,
    insuranceRequest: InsuranceRequestDto,
  ): Promise<BikeInsuranceResponseDto> {
    const bike = await this.getWithInsuranceById(bikeId);

    const insurancePlan = bike.insurances.find(
      (data) => data.id === +insuranceId,
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

  async createBike(bikeData: BikeCreateRequestDto) {
    const bikeDetail = bikeData.bike;
    const newBike = await this.bikeRepository.createBike({
      ...bikeDetail,
      wpBikeId: 0,
      seoTitle: '',
      seoDescription: '',
    });

    const offDaysData = bikeData.offDays;
    const basePricesData = bikeData.basePrices;
    const relatedBikesData = bikeData.relatedBikes;
    const insurancesData = bikeData.insurancePlans;

    for (const offDayData of offDaysData) {
      await this.bikeOffDayService.createBikeOffDay({
        ...offDayData,
        bike: newBike,
      });
    }

    for (const basePriceData of basePricesData) {
      await this.bikeBasePriceService.createBikeBasePrice({
        ...basePriceData,
        bike: newBike,
      });
    }

    for (const insuranceData of insurancesData) {
      await this.bikeInsurancePlanService.createInsurancePlan({
        ...insuranceData,
        bike: newBike,
      });
    }

    for (const relatedBikeData of relatedBikesData) {
      await this.relatedBikeService.createRelatedBike({
        bikeId: newBike.id,
        relatedBikeId: relatedBikeData.relatedBikeId,
      });
    }

    return newBike;
  }
}
