import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Bike } from './bike.entity';
import { BikeRentalBase } from './base.entity';

@Entity('bike_base_prices')
export class BikeBasePrice extends BikeRentalBase {
  @Column({ type: 'varchar', name: 'from_date', length: 255 })
  fromDate: string;

  @Column({ type: 'varchar', name: 'from_time', length: 255 })
  fromTime: string;

  @Column({ type: 'varchar', name: 'to_date', length: 255 })
  toDate: string;

  @Column({ type: 'varchar', name: 'to_time', length: 255 })
  toTime: string;

  @Column({ type: 'int', name: 'price_per_day' })
  pricePerDay: number;

  @Column({ type: 'int', name: 'bike_id' })
  bikeId: number;

  @ManyToOne(() => Bike, (bike) => bike.bikeBasePrices)
  @JoinColumn({ name: 'bike_id', referencedColumnName: 'id' })
  bike: Bike;
}
