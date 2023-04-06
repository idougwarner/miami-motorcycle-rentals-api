import { Column, Entity, OneToMany } from 'typeorm';
import { BikeRentalBase } from './base.entity';
import { BikeInsurancePlan } from './bike-insurance-plan.entity';

@Entity({ name: 'bike' })
export class Bike extends BikeRentalBase {
  @Column({
    nullable: false,
    name: 'wp_bike_id',
  })
  wpBikeId: number;

  @OneToMany(() => BikeInsurancePlan, (insurance) => insurance.bike, {
    cascade: ['insert', 'update', 'remove'],
  })
  insurances?: BikeInsurancePlan[];
}
