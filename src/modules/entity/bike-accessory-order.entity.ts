import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { IntegerTransformer } from '../../core/transformer/integer-transformer';
import { BikeRentalBase } from './base.entity';
import { BikeRentalOrder } from './bike-rental-order.entity';

@Entity({ name: 'bike_accessory_order' })
export class BikeAccessoryOrder extends BikeRentalBase {
  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
    type: 'int',
    transformer: new IntegerTransformer(),
  })
  price: number;

  @ManyToOne(() => BikeRentalOrder, (rent) => rent.accessories)
  @JoinColumn({ name: 'bike_rental_order_id', referencedColumnName: 'id' })
  bikeRental: BikeRentalOrder;
}
