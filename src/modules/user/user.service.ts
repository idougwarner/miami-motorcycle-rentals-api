import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { plainToClass, plainToInstance } from 'class-transformer';
import { isArray } from 'class-validator';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import {
  InitialBikeRentalRequest,
  UpdateUserDetailsRequest,
  UserDetailsResponseDto,
  UserResponse,
  VerifyAccountRequest,
} from '../../shared/dtos';
import { comparePasswords } from '../../shared/utils';
import { AuthErrorMessageCodes } from '../auth/auth-error-message-codes';
import { User } from '../entity/user.entity';
import { UserDetails } from './interfaces/user-details';
import { UserErrorMessageCodes } from './user-error-message-codes';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private userRepository: UserRepository) {}

  public async getAuthenticatedUser(
    username: string,
    pass: string,
  ): Promise<User> {
    const user = await this.findByUsername(username);
    if (!user) {
      throw new NotFoundException(UserErrorMessageCodes.USER_NOT_FOUND);
    }

    const areEqual = await comparePasswords(user.password, pass);
    if (!areEqual) {
      throw new UnauthorizedException(
        AuthErrorMessageCodes.INVALID_CREDENTIALS,
      );
    }
    return user;
  }

  async findByUsername(username: string): Promise<User> {
    return await this.userRepository.findByEmail(username);
  }

  public async getCurrentUserById(
    userId: number,
  ): Promise<UserDetailsResponseDto> {
    const currentUser = await this.userRepository.findByUserId(userId);

    if (!currentUser) {
      throw new BadRequestException(UserErrorMessageCodes.USER_NOT_FOUND);
    }

    return plainToInstance(UserDetailsResponseDto, currentUser, {
      excludeExtraneousValues: true,
    });
  }

  async verifyAccount(request: VerifyAccountRequest): Promise<UserResponse> {
    this.logger.log(`Verifying account with email: ${request.email}`);

    const user = await this.userRepository.findByEmailAndOtp(
      request.email,
      request.otpCode,
    );

    if (!user) {
      throw new NotFoundException(
        `User not found with email ${request.email} and opt ${request.otpCode}`,
      );
    }

    if (user.isVerified) {
      return plainToClass(UserResponse, user, {
        excludeExtraneousValues: true,
      });
    }

    const updatedUser = await this.userRepository.verifyAccount(user.id);

    return plainToClass(UserResponse, updatedUser, {
      excludeExtraneousValues: true,
    });
  }

  @Transactional()
  async createUpdateUserFromBikeRequest(
    body: InitialBikeRentalRequest,
  ): Promise<UserDetails> {
    this.logger.log(`Creating User  details`, body);
    const existingUser = await this.userRepository.findByEmail(body.email);

    if (existingUser) {
      const updatedUser = await this.userRepository.updateDetails(
        existingUser.id,
        {
          firstName: body.firstName,
          lastName: body.lastName,
          dateOfBirth: body.dateOfBirth,
          streetAddress: body.streetAddress,
          aptSuite: body.aptSuite,
          state: body.state || '',
          city: body.city,
          country: body.country,
          postalCode: body.postalCode || '',
          phoneNumber: body.phoneNumber,
        },
      );
      return {
        isExistingCustomer: true,
        user: updatedUser,
      };
    }

    const newUser = this.buildUserDetailsFromBikeRequest({
      ...body,
      state: body.state || '',
      postalCode: body.postalCode || '',
    });
    const user = await this.userRepository.saveUser(newUser);
    return {
      isExistingCustomer: false,
      user,
    };
  }

  async updateUserDetails(
    userId: number,
    request: UpdateUserDetailsRequest,
  ): Promise<UserResponse> {
    const userWithOrderList = await this.userRepository.findByUserId(userId);

    if (!userWithOrderList) {
      throw new NotFoundException('User not found');
    }

    if (
      !isArray(userWithOrderList.orders) ||
      userWithOrderList.orders.length === 0
    ) {
      throw new UnprocessableEntityException('No orders found');
    }

    const orderByVerificationCode = userWithOrderList.orders.find(
      (order) => order.verificationCode === request.verificationCode,
    );

    if (!orderByVerificationCode) {
      throw new UnauthorizedException('Verification code does not exists');
    }

    const updatedCustomer = await this.userRepository.updateDetails(
      userId,
      request,
    );

    return plainToClass(UserResponse, updatedCustomer, {
      excludeExtraneousValues: true,
    });
  }

  async attachStripeCustomerId(userId: number, stripeCustomerId: string) {
    await this.userRepository.attachStripeId(userId, stripeCustomerId);
  }

  private buildUserDetailsFromBikeRequest(
    request: InitialBikeRentalRequest,
  ): User {
    const user = new User();

    user.firstName = request.firstName;
    user.lastName = request.lastName;
    user.email = request.email.toLowerCase();
    user.phoneNumber = request.phoneNumber;
    user.dateOfBirth = request.dateOfBirth;
    user.country = request.country;
    user.city = request.city;
    user.streetAddress = request.streetAddress;
    user.aptSuite = request.aptSuite;
    user.state = request.state;
    user.postalCode = request.postalCode;
    return user;
  }
}
