import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { TransformedMediaItemRepository } from '../transformed-media-item/transformed-media-item.repository';
import { TransformedMediaItem } from '../entity/transformed-media-item.entity';
import { TransformedMediaItemService } from './transformed-media-item.service';
@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([TransformedMediaItem]),
    NestjsFormDataModule,
  ],
  providers: [TransformedMediaItemService, TransformedMediaItemRepository],
  exports: [TransformedMediaItemService],
})
export class TransformedMediaItemModule {}
