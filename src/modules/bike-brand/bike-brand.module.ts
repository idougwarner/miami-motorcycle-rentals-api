import { Module } from '@nestjs/common';
import { BikeBrandService } from './bike-brand.service';
import { BikeBrandController } from './bike-brand.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BikeBrandRepository } from './bike-brand.repository';
import { BikeBrand } from '../entity/bike-brands.entity';
import { MediaItemModule } from '../media-item/media-item.module';
@Module({
  imports: [HttpModule, MediaItemModule, TypeOrmModule.forFeature([BikeBrand])],
  providers: [BikeBrandService, BikeBrandRepository],
  controllers: [BikeBrandController],
  exports: [BikeBrandService],
})
export class BikeBrandModule {}
