import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { IntegerTransformer } from '../../core/transformer/integer-transformer';
import { InsuranceEnum } from '../../shared/common';
import { BikeRentalBase } from './base.entity';
import { Bike } from './bike.entity';
import { BikeRentalOrder } from './bike-rental-order.entity';

@Entity({ name: 'bike_insurance_plans' })
export class BikeInsurancePlan extends BikeRentalBase {
  @Column({
    nullable: false,
    type: 'int',
    name: 'min_age',
  })
  minAge: number;

  @Column({
    nullable: false,
    type: 'int',
    name: 'max_age',
  })
  maxAge: number;

  @Column({
    nullable: false,
    type: 'enum',
    enum: InsuranceEnum,
    default: InsuranceEnum.MINIMUM,
  })
  type: InsuranceEnum;

  @Column({
    nullable: false,
    type: 'int',
    transformer: new IntegerTransformer(),
    name: 'daily_rate',
  })
  dailyRate: number;

  @Column({
    nullable: false,
    type: 'int',
    transformer: new IntegerTransformer(),
  })
  deposit: number;

  @Column({
    nullable: false,
  })
  description: string;

  @Column({
    nullable: false,
    name: 'pop_up_description',
  })
  popUpDescription: string;

  @ManyToOne(() => Bike, (bike) => bike.insurances, { nullable: false })
  @JoinColumn({ name: 'bike_id', referencedColumnName: 'id' })
  bike: Bike;

  @OneToMany(() => BikeRentalOrder, (rentalOrder) => rentalOrder.bikeInsurancePlan)
  bikeRentalOrders: BikeRentalOrder[]
}
