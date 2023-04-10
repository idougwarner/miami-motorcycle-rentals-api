import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BikeRentalBase } from './base.entity';
import { BikeInsurancePlan } from './bike-insurance-plan.entity';

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
  regluar_price: number;

  @Column({
    nullable: false,
    name: 'discount_price',
  })
  discount_price: number;

  @Column({
    nullable: false,
    name: 'distance_included',
  })
  distance_included: string;

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
}
