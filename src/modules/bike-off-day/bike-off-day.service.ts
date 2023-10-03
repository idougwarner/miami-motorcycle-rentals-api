import { Injectable } from '@nestjs/common';
import { BikeOffDayRepository } from './bike-off-day.repository';
import { BikeOffDay } from '../entity/bike-off-day.entity';

@Injectable()
export class BikeOffDayService {
  constructor(private bikeOffDayRepository: BikeOffDayRepository) {}

  async createBikeOffDay(data: Partial<BikeOffDay>): Promise<BikeOffDay> {
    return await this.bikeOffDayRepository.createBikeOffDay(data);
  }
}
