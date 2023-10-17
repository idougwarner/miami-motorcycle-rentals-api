import { Entity, ManyToOne, JoinColumn, Column } from 'typeorm';
import { Bike } from './bike.entity';
import { BikeRentalBase } from './base.entity';

@Entity('related_bikes')
export class RelatedBike extends BikeRentalBase {
  @Column({
    type: 'int',
    nullable: false,
    name: 'bike_id',
  })
  bikeId: number;

  @Column({
    nullable: false,
    name: 'related_bike_id',
  })
  relatedBikeId: number;

  @ManyToOne(() => Bike, (bike) => bike.relatedBikes)
  @JoinColumn({ name: 'bike_id' })
  bike: Bike;

  @ManyToOne(() => Bike, (bike) => bike.bikesRelatedTo)
  @JoinColumn({ name: 'related_bike_id' })
  relatedBike: Bike;
}
