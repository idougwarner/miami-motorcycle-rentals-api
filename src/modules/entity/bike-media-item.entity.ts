import { Entity, Column } from 'typeorm';
import { BikeRentalBase } from './base.entity';

@Entity('bike_media_items')
export class BikeMediaItem extends BikeRentalBase {
  @Column({ type: 'int', name: 'bike_id' })
  bikeId: number;

  @Column({ type: 'int', name: 'media_item_id' })
  mediaItemId: number;
}
