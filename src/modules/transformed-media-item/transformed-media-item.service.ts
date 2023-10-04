import { Injectable } from '@nestjs/common';
import { TransformedMediaItemRepository } from './transformed-media-item.repository';
import { TransformedMediaItem } from '../entity/transformed-media-item.entity';

@Injectable()
export class TransformedMediaItemService {
  constructor(
    private transformedMediaItemRepository: TransformedMediaItemRepository,
  ) {}

  async create(data: Partial<TransformedMediaItem>) {
    return await this.transformedMediaItemRepository.createTransformedMediaItem(
      data,
    );
  }
}
