import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransformedMediaItem } from '../entity/transformed-media-item.entity';

@Injectable()
export class TransformedMediaItemRepository {
  constructor(
    @InjectRepository(TransformedMediaItem)
    private readonly transformedMediaItemRepository: Repository<TransformedMediaItem>,
  ) {}

  public async createTransformedMediaItem(
    data: Partial<TransformedMediaItem>,
  ): Promise<TransformedMediaItem> {
    const transformedMediaItem =
      this.transformedMediaItemRepository.create(data);
    return await this.transformedMediaItemRepository.save(transformedMediaItem);
  }
}
