import { Exclude } from 'class-transformer';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BikeRentalBase } from './base.entity';
import { MediaItem } from './media-item.entity';

@Entity({ name: 'transformed_media_items' })
export class TransformedMediaItem extends BikeRentalBase {
  @Column({
    nullable: false,
    name: 'width',
  })
  width: number;

  @Column({
    nullable: false,
    name: 'height',
  })
  height: number;

  @Column({
    nullable: false,
    name: 'filesize',
  })
  filesize: number;

  @Column({
    nullable: false,
    name: 'mime_type',
  })
  mimeType: string;

  @Column({
    nullable: false,
    name: 'media_size',
  })
  mediaSize: string;

  @Column({
    nullable: false,
    name: 'media_url',
  })
  mediaUrl: string;

  @Column({
    nullable: false,
    name: 'filename',
  })
  filename: string;

  @Column({ type: 'int', name: 'media_item_id' })
  mediaItemId: number;

  @Column({
    nullable: false,
    name: 'type',
  })
  type: string;

  @Exclude()
  alt: string;

  @ManyToOne(() => MediaItem)
  @JoinColumn({ name: 'media_item_id' })
  mediaItem: MediaItem;
}
