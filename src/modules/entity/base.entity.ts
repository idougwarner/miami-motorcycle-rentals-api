import {
  BaseEntity,
  PrimaryColumn,
  Generated,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BikeRentalBase extends BaseEntity {
  @PrimaryColumn()
  @Generated('increment')
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
