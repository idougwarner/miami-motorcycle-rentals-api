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

  public async createMediaItem(data: Partial<MediaItem>): Promise<MediaItem> {
    const mediaItem = this.mediaItemRepository.create(data);
    return await this.mediaItemRepository.save(mediaItem);
  }

  async findById(id: number): Promise<MediaItem> {
    return this.mediaItemRepository.findOne(id);
  }
}
