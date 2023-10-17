import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BikeRentalBase } from './base.entity';
import { Bike } from './bike.entity';

@Entity({ name: 'bike_off_days' })
export class BikeOffDay extends BikeRentalBase {
  @Column({ type: 'varchar', length: 255, name: 'from_date' })
  fromDate: string;

  @Column({ type: 'varchar', length: 255, name: 'from_time' })
  fromTime: string;

  @Column({ type: 'varchar', length: 255, name: 'to_date' })
  toDate: string;

  @Column({ type: 'varchar', length: 255, name: 'to_time' })
  toTime: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'int', name: 'bike_id' })
  bikeId: number;

  @ManyToOne(() => Bike, (bike) => bike.bikeOffDays)
  @JoinColumn({ name: 'bike_id', referencedColumnName: 'id' })
  bike: Bike;
}
