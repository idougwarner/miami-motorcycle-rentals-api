import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BikeRentalBase } from './base.entity';
import { Bike } from './bike.entity';
import { MediaItem } from './media-item.entity';

@Entity({ name: 'bike_types' })
export class BikeType extends BikeRentalBase {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({
    nullable: false,
    name: 'slug',
  })
  slug: string;

  @Column({ type: 'int', name: 'media_item_id' })
  mediaItemId: number;

  @ManyToOne(() => MediaItem, (mediaItem) => mediaItem.bikeTypes)
  @JoinColumn({ name: 'media_item_id' })
  mediaItem: MediaItem;

  @OneToMany(() => Bike, (bike) => bike.type, {
    cascade: ['insert', 'update', 'remove'],
  })
  bikes: Bike[];
}
