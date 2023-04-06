import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import { UserRole } from '../../shared/common';
import { generateVerificationCode } from '../../shared/utils';
import { BikeRentalBase } from './base.entity';
import { BikeRentalOrder } from './bike-rental-order.entity';

@Entity({ name: 'user' })
export class User extends BikeRentalBase {
  @Column({ length: 80, name: 'first_name', nullable: false })
  firstName: string;

  @Column({ length: 80, name: 'last_name', nullable: false })
  lastName: string;

  @Column({
    nullable: false,
  })
  email: string;

  @Column({
    name: 'phone_number',
    nullable: false,
  })
  phoneNumber: string;

  @Column({
    name: 'birth_date',
    nullable: false,
    type: 'date',
  })
  dateOfBirth: string;

  @Column({ length: 80, nullable: false })
  country: string;

  @Column({ length: 80, nullable: false })
  city: string;

  @Column({ name: 'street_address', length: 100, nullable: false })
  streetAddress: string;

  @Column({ length: 80, name: 'apt_suite', nullable: true })
  aptSuite: string;

  @Column({ length: 80, nullable: false })
  state: string;

  @Column({ length: 80, name: 'postal_code', nullable: false })
  postalCode: string;

  @Column({ nullable: true })
  password: string;

  @Column({
    name: 'is_verified',
    type: 'boolean',
    default: false,
  })
  isVerified: boolean;

  @Column({
    name: 'verification_code',
    nullable: false,
    length: 4,
  })
  verificationCode: string;

  @Column({
    name: 'stripe_customer_id',
    nullable: true,
  })
  stripeCustomerId: string;

  @OneToMany(() => BikeRentalOrder, (order) => order.user, {
    onDelete: 'CASCADE',
  })
  orders: BikeRentalOrder[];

  @Column({
    name: 'role',
    type: 'enum',
    nullable: false,
    enum: UserRole,
    default: UserRole.CUSTOMER,
  })
  role: UserRole;

  @BeforeInsert()
  async processDataBeforeInsert(): Promise<void> {
    this.verificationCode = generateVerificationCode(4);
  }
}
