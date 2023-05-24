import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDetailsRequest } from '../../shared/dtos';
import { User } from '../entity/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findByUserId(userId: number): Promise<User> {
    return this.usersRepository.findOne({
      where: { id: userId },
      relations: ['orders'],
    });
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { email },
    });
  }

  async findByEmailAndOtp(email: string, otpCode: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { otpCode, user: { email } },
    });
  }

  async verifyAccount(userId: number): Promise<User> {
    await this.usersRepository
      .createQueryBuilder()
      .update()
      .set({
        isVerified: true,
      })
      .where({ id: userId })
      .execute();

    return this.usersRepository.findOne({
      where: { id: userId },
    });
  }

  async attachStripeId(userId: number, stripeCustomerId: string) {
    await this.usersRepository
      .createQueryBuilder()
      .update()
      .set({
        stripeCustomerId,
      })
      .where({ id: userId })
      .execute();
  }

  async updateDetails(
    userId: number,
    request:
      | Omit<UpdateUserDetailsRequest, 'verificationCode'>
      | UpdateUserDetailsRequest,
  ) {
    await this.usersRepository
      .createQueryBuilder()
      .update()
      .set({
        firstName: request.firstName,
        lastName: request.lastName,
        dateOfBirth: request.dateOfBirth,
        streetAddress: request.streetAddress,
        aptSuite: request.aptSuite,
        state: request.state,
        city: request.city,
        country: request.country,
        postalCode: request.postalCode,
        phoneNumber: request.phoneNumber,
      })
      .where({ id: userId })
      .execute();

    return this.usersRepository.findOne({
      where: { id: userId },
    });
  }

  async saveUser(user: User): Promise<User> {
    return await this.usersRepository.save(this.usersRepository.create(user));
  }
}
