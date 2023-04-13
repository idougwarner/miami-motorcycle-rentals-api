import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BikeRentalBase } from './base.entity';
import { BikeInsurancePlan } from './bike-insurance-plan.entity';
import { MediaItem } from './media-item.entity';
import { BikeType } from './bike-type.entity';
import { BikeBrand } from './bike-brands.entity';

@Entity({ name: 'bikes' })
export class Bike extends BikeRentalBase {
  @Column({
    nullable: false,
    name: 'wp_bike_id',
  })
  wpBikeId: number;

  @Column({
    nullable: false,
    name: 'seo_title',
  })
  seoTitle: string;

  @Column({
    nullable: false,
    name: 'seo_description',
  })
  seoDescription: string;

  @Column({
    nullable: false,
    name: 'name',
  })
  name: string;

  @Column({
    nullable: false,
    name: 'slug',
  })
  slug: string;

  @Column({
    nullable: false,
    name: 'description',
  })
  description: string;

  @Column({
    nullable: false,
    name: 'model',
  })
  model: string;

  @Column({
    nullable: false,
    name: 'regular_price',
  })
  regularPrice: number;

  @Column({
    nullable: false,
    name: 'discount_price',
  })
  discountPrice: number;

  @Column({
    nullable: false,
    name: 'distance_included',
  })
  distanceIncluded: string;

  @Column({
    nullable: false,
    name: 'highlights',
  })
  highlights: string;

  @Column({
    nullable: false,
    name: 'features',
  })
  features: string;

  @Column({
    nullable: false,
    name: 'extras',
  })
  extras: string;

  @OneToMany(() => BikeInsurancePlan, (insurance) => insurance.bike, {
    cascade: ['insert', 'update', 'remove'],
  })
  insurances?: BikeInsurancePlan[];

  @ManyToMany(() => MediaItem, (mediaItem) => mediaItem.bikes)
  @JoinTable({
    name: 'bike_media_items',
    joinColumn: { name: 'bike_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'media_item_id', referencedColumnName: 'id' },
  })
  mediaItems: MediaItem[];

  @Column({
    nullable: false,
    name: 'featured_media_item_id',
  })
  featuredMediaItemId: number;

  @ManyToOne(() => MediaItem, (mediaItem) => mediaItem.featuredBikes, {
    nullable: true,
  })
  @JoinColumn({ name: 'featured_media_item_id', referencedColumnName: 'id' })
  featuredMediaItem?: MediaItem;

  @Column({
    nullable: false,
    name: 'type_id',
  })
  typeId: number;

  @ManyToOne(() => BikeType, (bikeType) => bikeType.bikes, { nullable: true })
  @JoinColumn({ name: 'type_id', referencedColumnName: 'id' })
  type?: BikeType;

  @Column({
    nullable: false,
    name: 'brand_id',
  })
  brandId: number;

  @ManyToOne(() => BikeBrand, (bikeBrand) => bikeBrand.bikes, {
    nullable: true,
  })
  @JoinColumn({ name: 'brand_id', referencedColumnName: 'id' })
  brand?: BikeBrand;
}
