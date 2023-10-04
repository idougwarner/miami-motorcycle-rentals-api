import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaItem } from '../entity/media-item.entity';
import { MediaItemService } from './media-item.service';
import { MediaItemRepository } from './media-item.repository';
import { MediaItemController } from './media-item.controller';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { TransformedMediaItemModule } from '../transformed-media-item/transformed-media-item.module';
@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([MediaItem]),
    NestjsFormDataModule,
    TransformedMediaItemModule,
  ],
  providers: [MediaItemService, MediaItemRepository],
  controllers: [MediaItemController],
  exports: [MediaItemService],
})
export class MediaItemModule {}
