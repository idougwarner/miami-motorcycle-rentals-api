import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { BikeRentalBase } from './base.entity';
import { Bike } from './bike.entity';
import { MediaItem } from './media-item.entity';

@Entity('bike_brands')
export class BikeBrand extends BikeRentalBase {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  slug: string;

  @Column({ type: 'int', name: 'media_item_id' })
  mediaItemId: number;

  @Column({ type: 'int', name: 'is_popular' })
  isPopular: boolean;

  @Column({ type: 'varchar', length: 255 })
  revision: string;

  @OneToMany(() => Bike, (bike) => bike.brand)
  bikes: Bike[];

  @ManyToOne(() => MediaItem)
  @JoinColumn({ name: 'media_item_id' })
  mediaItem: MediaItem;
}
