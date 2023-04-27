import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import * as moment from 'moment';
import { plainToClass, plainToInstance } from 'class-transformer';
import { isArray } from 'class-validator';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { OrderStatusEnum } from '../../shared/common';
import {
  InitialBikeRentalRequest,
  UpdateBikeRentalRequest,
  WpBikeResponse,
  VerifyOrderRequest,
  InitialBikeOrderResponse,
  UpdateBikeOrderResponse,
} from '../../shared/dtos';
import { BikeAccessoryOrder } from '../entity/bike-accessory-order.entity';
import { BikeRentalOrder } from '../entity/bike-rental-order.entity';
import { MailService } from '../mail/mail.service';
import { UserService } from '../user/user.service';
import { BikeRentalOrderRepository } from './bike-rental-order.repository';
import { BikeService } from '../bike/bike.service';
import { generateVerificationCode } from '../../shared/utils';
import {
  BikePricing,
  CalculationResult,
  gearPrices,
} from '../../shared/calculations';
import { BikeInsurancePlanService } from '../bike-insurance-plan/bike-insurance-plan.service';
import { BikeInsurancePlan } from '../entity/bike-insurance-plan.entity';
import { RequestedOrderDatesResponseDto } from '../../shared/dtos/bike-rental-order/requested-order-dates.dto';

@Injectable()
export class BikeRentalOrderService {
  private readonly logger = new Logger(BikeRentalOrderService.name);

  constructor(
    private bikeRentalRepository: BikeRentalOrderRepository,
    private userService: UserService,
    private mailService: MailService,
    private bikeService: BikeService,
    private bikeInsurancePlanService: BikeInsurancePlanService,
  ) {}

  @Transactional()
  async initialOrder(
    body: InitialBikeRentalRequest,
  ): Promise<InitialBikeOrderResponse> {
    this.logger.log(`Creating new order with details `, body);

    const bikeDetails = await this.bikeService.getWpBikeDetails(body.bikeId);

    if (!bikeDetails) {
      throw new NotFoundException('Bike does not exist ');
    }

    const userDetails = await this.userService.createUserFromBikeRequest(body);

    const initialBikeOrder = this.buildInitialBikeOrder(bikeDetails);
    initialBikeOrder.user = userDetails.user;

    initialBikeOrder.verificationCode = await this.generateCode(
      userDetails.user.email,
    );

    const createdInitialOrder =
      await this.bikeRentalRepository.createInitialOrder(initialBikeOrder);

    await this.mailService.sendBikeOrderVerification(createdInitialOrder);

    const response = plainToClass(
      InitialBikeOrderResponse,
      createdInitialOrder,
      {
        excludeExtraneousValues: true,
      },
    );
    response.isExistingCustomer = userDetails.isExistingCustomer;
    return response;
  }

  async updateOrderOnCheckout(
    orderId: number,
    orderRequest: UpdateBikeRentalRequest,
  ): Promise<UpdateBikeOrderResponse> {
    this.logger.log({
      message: 'Updating bike rental order to on_checkout',
      value: orderRequest,
    });

    let bikeOrder = await this.getOrderById(orderId);

    if (!bikeOrder.isVerified) {
      this.logger.error(
        'Bike order is not verified with order id: ' + bikeOrder.id,
      );
      throw new UnprocessableEntityException('Order is not verified.');
    }

    if (orderRequest.verificationCode !== bikeOrder.verificationCode) {
      this.logger.error(
        'Bike order verification code from ui mismatch from the one saved from db: ' +
          bikeOrder.id,
      );
      throw new UnauthorizedException('Verification code mismatch.');
    }

    if (!bikeOrder.user.stripeCustomerId) {
      this.userService.attachStripeCustomerId(
        bikeOrder.user.id,
        orderRequest.stripeCustomerId,
      );
    }

    const insurancePlan =
      await this.bikeInsurancePlanService.getBikeInsurancePlanById(
        orderRequest.insurancePlanId,
      );

    const age = moment().diff(moment(bikeOrder.user.dateOfBirth), 'years');
    const pricing = BikePricing.calculate(
      bikeOrder.dailyBikePrice,
      orderRequest.duration,
      age,
      insurancePlan.dailyRate,
      insurancePlan.deposit,
      new Set(orderRequest.accessories),
      bikeOrder.bikeId,
      orderRequest.roadAssistance,
    ) as CalculationResult;

    bikeOrder = this.buildUpdatedRentalRequest(
      bikeOrder,
      orderRequest,
      pricing,
      insurancePlan,
      OrderStatusEnum.ON_CHECKOUT,
    );

    const updatedOrder = await this.bikeRentalRepository.updateOrder(bikeOrder);
    this.logger.log({
      message: 'Updated order to on_checkout success',
      value: updatedOrder,
    });

    return plainToClass(UpdateBikeOrderResponse, updatedOrder, {
      excludeExtraneousValues: true,
    });
  }

  async updateOrder(
    orderId: number,
    orderRequest: UpdateBikeRentalRequest,
  ): Promise<UpdateBikeOrderResponse> {
    this.logger.log({
      message:
        'Bike rental order payment confirmed updating status to requested',
      value: orderRequest,
    });
    let bikeOrder = await this.getOrderById(orderId);
    if (!bikeOrder.isVerified) {
      throw new UnauthorizedException('Order is not verified.');
    }

    if (orderRequest.verificationCode !== bikeOrder.verificationCode) {
      throw new UnauthorizedException('Verification code mismatch.');
    }

    if (!bikeOrder.user.stripeCustomerId) {
      this.userService.attachStripeCustomerId(
        bikeOrder.user.id,
        orderRequest.stripeCustomerId,
      );
    }

    const bikeInsurancePlan =
      await this.bikeInsurancePlanService.getBikeInsurancePlanById(
        bikeOrder.bikeInsurancePlan.id,
      );

    const age = moment().diff(moment(bikeOrder.user.dateOfBirth), 'years');
    const pricing = BikePricing.calculate(
      bikeOrder.dailyBikePrice,
      orderRequest.duration,
      age,
      bikeInsurancePlan.dailyRate,
      bikeInsurancePlan.deposit,
      new Set(orderRequest.accessories),
      bikeOrder.bikeId,
      orderRequest.roadAssistance,
    ) as CalculationResult;

    const updatedOrder = await this.bikeRentalRepository.updateOrderStatus(
      bikeOrder.id,
      OrderStatusEnum.REQUESTED,
    );

    this.mailService.sendRentRequestToClient(updatedOrder, pricing);
    this.mailService.sendRentRequestToOwner(updatedOrder, pricing);

    return plainToClass(UpdateBikeOrderResponse, updatedOrder, {
      excludeExtraneousValues: true,
    });
  }

  async verifyOrder(
    orderId: number,
    order: VerifyOrderRequest,
  ): Promise<UpdateBikeOrderResponse> {
    const bikeOrder =
      await this.bikeRentalRepository.getBikeOrderByVerificationCodeAndEmail(
        orderId,
        order.verificationCode,
        order.email,
      );

    if (!bikeOrder) {
      throw new NotFoundException(
        `Email ${order.email} and verification code ${order.verificationCode} not found.`,
      );
    }

    const verifiedOrder = this.bikeRentalRepository.verifyOrder(bikeOrder.id);

    return plainToClass(UpdateBikeOrderResponse, verifiedOrder, {
      excludeExtraneousValues: true,
    });
  }

  async resendVerificationCode(orderId: number) {
    const bikeOrder = await this.getOrderById(orderId);

    const code = await this.generateCode(bikeOrder.user.email);

    const updatedOrder =
      await this.bikeRentalRepository.updateNewVerificationCode(
        bikeOrder.id,
        code,
      );

    this.mailService.sendBikeOrderVerification(updatedOrder);
  }

  async getOrderById(orderId: number): Promise<BikeRentalOrder> {
    const bikeOrder = await this.bikeRentalRepository.getBikeOrderById(orderId);

    if (!bikeOrder) {
      throw new NotFoundException('Bike rental order not found.');
    }

    return bikeOrder;
  }

  async generateCode(email: string): Promise<string> {
    this.logger.log('Generating verification code');
    let code = generateVerificationCode(5);
    const existingOrder =
      await this.bikeRentalRepository.getBikeOrderByCodeAndEmail(code, email);

    if (existingOrder) {
      this.logger.log(
        'Generated code is already used will generate a new one until code is unique',
      );

      let isUnique = false;
      while (!isUnique) {
        const newCode = generateVerificationCode(5);
        const order =
          await this.bikeRentalRepository.getBikeOrderByCodeAndEmail(
            newCode,
            email,
          );

        if (!order) {
          this.logger.log(
            'Unique verification code for customer found, breaking the loop',
          );
          code = newCode;
          isUnique = true;
        }
      }
    }
    return code;
  }

  async getBikeRequestedOrder(
    bikeWordpressId: number,
  ): Promise<Array<RequestedOrderDatesResponseDto>> {
    const requestedOrders =
      await this.bikeRentalRepository.getBikeRequestedOrder(bikeWordpressId);

    return plainToInstance(RequestedOrderDatesResponseDto, requestedOrders, {
      excludeExtraneousValues: true,
    });
  }

  private buildInitialBikeOrder(bikeDetails: WpBikeResponse): BikeRentalOrder {
    const initialBikeOrder = new BikeRentalOrder();
    initialBikeOrder.bikeId = bikeDetails.id;
    initialBikeOrder.bikeBrand = bikeDetails.brand;
    initialBikeOrder.bikeModel = bikeDetails.model;
    initialBikeOrder.bikeImage = bikeDetails.primaryImage;
    initialBikeOrder.dailyBikePrice = bikeDetails.dailyPrice;
    return initialBikeOrder;
  }

  private buildUpdatedRentalRequest(
    bikeOrder: BikeRentalOrder,
    request: UpdateBikeRentalRequest,
    pricing: CalculationResult,
    insurancePlan: BikeInsurancePlan,
    status: string,
  ): BikeRentalOrder {
    bikeOrder.orderTotalAmount = pricing.total;
    bikeOrder.orderSubTotalAmount = pricing.subTotal; //Rental total cost excluding sales tax
    bikeOrder.insuranceDailyRate = pricing.coverageCost.rate;
    bikeOrder.insuranceDeposit = pricing.coverageCost.deposit;
    bikeOrder.dropOffDate = request.dropOffDate;
    bikeOrder.dropOffTime = request.dropOffTime;
    bikeOrder.pickUpDate = request.pickUpDate;
    bikeOrder.pickUpTime = request.pickUpTime;
    bikeOrder.insuranceName = insurancePlan.type;
    bikeOrder.roadAssistance = request.roadAssistance;
    bikeOrder.status = status;
    bikeOrder.stripePaymentId = request.stripePaymentId;
    bikeOrder.bikeInsurancePlan = insurancePlan;

    const accessories: BikeAccessoryOrder[] = [];
    if (isArray(request.accessories)) {
      request.accessories.forEach((gearType) => {
        const newAccessory = new BikeAccessoryOrder();
        newAccessory.name = gearPrices[gearType].name;
        newAccessory.price = gearPrices[gearType].price;
        accessories.push(newAccessory);
      });
    }
    bikeOrder.accessories = accessories;

    return bikeOrder;
  }

  async updateBikeId() {
    const bikes = await this.bikeService.findAll();
    return Promise.all(
      bikes.map(async (bike) => {
        return this.bikeRentalRepository.updateBikeIdFromWpId(
          bike.id,
          bike.wpBikeId,
        );
      }),
    );
  }
}
