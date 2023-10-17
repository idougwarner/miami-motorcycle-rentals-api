import { InjectRepository } from '@nestjs/typeorm';
import { EntityRepository, Repository } from 'typeorm';
import { BikeOffDay } from '../entity/bike-off-day.entity';

@EntityRepository(BikeOffDay)
export class BikeOffDayRepository {
  constructor(
    @InjectRepository(BikeOffDay)
    private readonly offDayRepository: Repository<BikeOffDay>,
  ) {}

  async createBikeOffDay(bikeData: Partial<BikeOffDay>): Promise<BikeOffDay> {
    const offDays = this.offDayRepository.create(bikeData);
    return await this.offDayRepository.save(offDays);
  }

  async findOne(id: number) {
    return await this.offDayRepository.findOne(id);
  }

  async save(data: BikeOffDay) {
    return await this.offDayRepository.save(data);
  }

  async deleteByBikeId(bikeId: number) {
    await this.offDayRepository.delete({ bikeId });
  }
}
