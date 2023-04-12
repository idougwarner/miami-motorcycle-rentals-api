import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BikeRentalBase } from './base.entity';
import { BikeInsurancePlan } from './bike-insurance-plan.entity';
import { MediaItem } from './media-item.entity';
import { BikeType } from './bike-type.entity';
import { BikeMediaItem } from './bike-media-item.entity';
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
    name: 'regluar_price',
  })
  regluarPrice: number;

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

  @OneToMany(() => BikeMediaItem, (bikeMediaItem) => bikeMediaItem.bike, {
    cascade: ['insert', 'update', 'remove'],
  })
  bikeMediaItems?: BikeMediaItem[];

  @ManyToOne(() => MediaItem, (mediaItem) => mediaItem.bikes, { nullable: true })
  @JoinColumn({ name: 'featured_media_item_id', referencedColumnName: 'id' })
  featuredMediaItem?: MediaItem;

  @ManyToOne(() => BikeType, (bikeType) => bikeType.bikes, { nullable: true })
  @JoinColumn({ name: 'type_id', referencedColumnName: 'id' })
  type?: BikeType;

  @ManyToOne(() => BikeBrand, (bikeBrand) => bikeBrand.bikes, { nullable: true })
  @JoinColumn({ name: 'type_id', referencedColumnName: 'id' })
  brand?: BikeBrand;
}
