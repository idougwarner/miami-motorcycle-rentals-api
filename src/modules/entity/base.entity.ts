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

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
