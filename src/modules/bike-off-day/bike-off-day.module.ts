import { Module } from '@nestjs/common';
import { BikeOffDayService } from './bike-off-day.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BikeOffDay } from '../entity/bike-off-day.entity';
import { BikeOffDayRepository } from './bike-off-day.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BikeOffDay])],
  providers: [BikeOffDayService, BikeOffDayRepository],
  exports: [BikeOffDayService],
})
export class BikeOffDayModule {}
