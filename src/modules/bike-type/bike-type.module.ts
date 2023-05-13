import { Module } from '@nestjs/common';
import { BikeTypeService } from './bike-type.service';
import { BikeTypeController } from './bike-type.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BikeTypeRepository } from './bike-type.repository';
import { BikeType } from '../entity/bike-type.entity';
@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([BikeType])],
  providers: [BikeTypeService, BikeTypeRepository],
  controllers: [BikeTypeController],
  exports: [BikeTypeService],
})
export class BikeTypeModule {}
