import { Injectable } from '@nestjs/common';
import { BikeOffDayRepository } from './bike-off-day.repository';
import { BikeOffDay } from '../entity/bike-off-day.entity';

@Injectable()
export class BikeOffDayService {
  constructor(private bikeOffDayRepository: BikeOffDayRepository) {}

  async createBikeOffDay(data: Partial<BikeOffDay>): Promise<BikeOffDay> {
    return await this.bikeOffDayRepository.createBikeOffDay(data);
  }

  async updateBikeOffDay(
    bikeOffDayId: number,
    updateData: Partial<BikeOffDay>,
  ): Promise<any> {
    try {
      const bikeOffDay = await this.bikeOffDayRepository.findOne(bikeOffDayId);
      if (!bikeOffDay) {
        throw new Error('Bike off day not found');
      }
      Object.assign(bikeOffDay, updateData);
      return await this.bikeOffDayRepository.save(bikeOffDay);
    } catch (error) {
      console.error(error);
    }
  }

  async deleteByBikeId(bikeId: number) {
    await this.bikeOffDayRepository.deleteByBikeId(bikeId);
  }
}
