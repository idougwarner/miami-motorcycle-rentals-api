import { Injectable, Logger } from '@nestjs/common';
import { Stripe } from 'stripe';
import {
  CreateStripePaymentIntentRequestDto,
  BikeForOrderResponse,
} from 'src/shared/dtos';
import * as moment from 'moment';
import { BikePricing, CalculationResult } from '../../shared/calculations';
import { AppConstants } from '../../shared/common';
import { BikeInsurancePlanService } from '../bike-insurance-plan/bike-insurance-plan.service';
import { convertDateFormat } from '../../shared/utils/date-util';
import { BikeRentalOrderService } from '../bike-rental-order/bike-rental-order.service';

@Injectable()
export class StripeService {
  private readonly logger = new Logger(StripeService.name);
  stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  /**
   * About Stripe api version (required):
   *  When backwards-incompatible changes are made to the API, a new, dated version is released. The current version is 2022-08-01
   *  Also the api version can be viewed under the api version section in the stripe dashboard: https://dashboard.stripe.com/test/developers
   */
  config: Stripe.StripeConfig = { apiVersion: '2022-08-01' };

  stripe = new Stripe(this.stripeSecretKey, this.config);

  constructor(
    private bikeOrderService: BikeRentalOrderService,
    private bikeInsuranceService: BikeInsurancePlanService,
  ) {}

  async createPaymentIntent(
    orderId: number,
    orderDetails: CreateStripePaymentIntentRequestDto,
    bikeDetails: BikeForOrderResponse,
  ) {
    this.logger.log({
      message: 'Stripe payment intent creation request',
      value: orderDetails,
    });

    const bikeOrder = await this.bikeOrderService.getOrderById(orderId);

    const customers = await this.stripe.customers.search({
      query: `email:'${bikeOrder.user.email}'`,
    });
    let customer: Stripe.Customer;
    if (customers.data.length === 0) {
      customer = await this.stripe.customers.create({
        name: orderDetails.personName,
        email: bikeOrder.user.email.toLowerCase(),
        phone: bikeOrder.user.phoneNumber,
      });
    } else {
      customer = customers.data[0];
    }

    const age = moment().diff(
      moment(bikeOrder.user.dateOfBirth, AppConstants.DATE_FORMAT),
      'years',
    );

    const bikeInsurance =
      await this.bikeInsuranceService.getBikeInsurancePlanById(
        orderDetails.bikeInsuranceId,
      );

    const pricing = BikePricing.calculate(
      orderDetails.bikePrice,
      orderDetails.duration,
      age,
      bikeInsurance.dailyRate,
      bikeInsurance.deposit,
      new Set(orderDetails.addOns),
      orderDetails.bikeId,
      orderDetails.roadAssistance,
    ) as CalculationResult;

    this.logger.log({
      message: 'Calculated pricing',
      value: pricing,
    });

    const addons = pricing.gearCost.gearCost
      .map((g) => `${g.title} : $${g.subtotal} `)
      .join(', ');

    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: parseFloat((pricing.coverageCost.deposit * 100).toFixed(2)),
      currency: 'usd',
      capture_method: 'manual',
      description: `DEPOSIT : ${bikeDetails.title} for ${pricing.data.days} days.`,
      metadata: {
        '0-Bike': bikeDetails.title,
        '01-Pickup Date': convertDateFormat(orderDetails.pickUpDate),
        '02-Pickup Time': orderDetails.pickUpTime,
        '03-Drop off Date': convertDateFormat(orderDetails.dropOffDate),
        '04-Drop off Time': orderDetails.dropOffTime,
        '05-Bike renting days': pricing.data.days,
        '06-Bike price per day': `($${
          pricing.rentalCost.rate
        }) after the discount (${pricing.rentalCost.discount * 100}%), ($${
          pricing.data.price
        }) before the discount`,
        '07-Total bike renting cost': `$${(
          pricing.rentalCost.rate * pricing.data.days
        ).toFixed(2)} (${pricing.rentalCost.rate} x ${pricing.data.days})`,
        '08-User age': `${age} (${convertDateFormat(
          bikeOrder.user.dateOfBirth,
        )})`,
        '09-Insurance': `${bikeInsurance.type} $${pricing.coverageCost.total} (${pricing.coverageCost.rate} x ${pricing.data.days})`,
        '10-Road assistance': orderDetails.roadAssistance
          ? `Yes $${12 * pricing.data.days} ($12 x ${pricing.data.days})`
          : 'No',
        '11-Addons': pricing.gearCost.gearCost.length
          ? addons
          : 'No Add ons selected',
        '12-Rental Sub Total': `$${pricing.subTotal}`,
        '13-Sales Tax 7%': `$${pricing.salesTax}`,
        '14-Rental Total': `$${pricing.total}`,
        '15-Deposit total': `$${pricing.coverageCost.deposit}`,
      },
      automatic_payment_methods: {
        enabled: true,
      },
      payment_method_options: {
        card: {
          setup_future_usage: 'off_session',
        },
      },
      customer: customer.id,
    });

    return paymentIntent;
  }
}
