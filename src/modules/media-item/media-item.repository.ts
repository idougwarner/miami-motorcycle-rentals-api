import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MediaItem } from '../entity/media-item.entity';

@Injectable()
export class MediaItemRepository {
  constructor(
    @InjectRepository(MediaItem)
    private readonly mediaItemRepository: Repository<MediaItem>,
  ) {}

  async getAll(): Promise<MediaItem[]> {
    return this.mediaItemRepository.find();
  }

  public async createInitialOrder(
    initialOrder: MediaItem,
  ): Promise<MediaItem> {
    return await this.mediaItemRepository.save(initialOrder);
  }
}
