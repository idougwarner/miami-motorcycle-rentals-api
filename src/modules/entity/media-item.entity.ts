import { Column, Entity, OneToMany } from 'typeorm';
import { BikeRentalBase } from './base.entity';
import { BikeType } from './bike-type.entity';
import { BikeBrand } from './bike-brands.entity';
import { Bike } from './bike.entity';
import { BikeMediaItem } from './bike-media-item.entity';

@Entity({ name: 'media_items' })
export class MediaItem extends BikeRentalBase {
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
    name: 'media_url',
  })
  mediaUrl: string;

  @Column({
    nullable: false,
    name: 'filename',
  })
  filename: string;

  @Column({
    nullable: false,
    name: 'title',
  })
  title: string;

  @Column({
    nullable: false,
    name: 'alt',
  })
  alt: string;

  @Column({
    nullable: false,
    name: 'type',
  })
  type: string;

  @OneToMany(() => BikeType, (bikeType) => bikeType.mediaItem)
  bikeTypes: BikeType[]

  @OneToMany(() => BikeBrand, (bikeBrand) => bikeBrand.mediaItem)
  bikeBrands: BikeBrand[]

  @OneToMany(() => Bike, (bike) => bike.mediaItems)
  bikes: Bike[]

  @OneToMany(() => BikeMediaItem, (bikeMediaItem) => bikeMediaItem.mediaItem)
  bikeMediaItems: BikeMediaItem[]
}
