import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { MailOptions } from './mail-options';
import { join } from 'path';
import { environment } from '../../environments/environment';
import { EmailTemplates } from '../../shared/email-templates';
import { User } from '../entity/user.entity';
import { BikeRentalOrder } from '../entity/bike-rental-order.entity';
import { isArray } from 'class-validator';
import {
  CalculationResult,
  SALES_TAX_CONFIG,
} from '../../../../shared/calculations';
import { convertDateFormat } from '../../shared/utils/date-util';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(private mailerService: MailerService) {}

  public async sendRentRequestToOwner(
    bikeOrder: BikeRentalOrder,
    pricing: any,
  ) {
    const accessories = pricing.gearCost.gearCost.map((g) => ({
      name: g.title,
      unitPrice: g.unitPrice,
      subTotal: g.subtotal,
      days: pricing.data.days,
    }));

    const mailConfig: MailOptions = {
      to: process.env.STORE_OWNER,
      template: EmailTemplates.RENT_REQUEST_TO_OWNER,
      subject: 'New booking request',
      attachments: [
        {
          path: bikeOrder.bikeImage,
          cid: 'bike-image',
        },
      ],
      context: {
        name: `${bikeOrder.user.firstName} ${bikeOrder.user.lastName}`,
        email: bikeOrder.user.email,
        phone: bikeOrder.user.phoneNumber,
        dateOfBirth: convertDateFormat(bikeOrder.user.dateOfBirth),
        address: `${bikeOrder.user.aptSuite} ${bikeOrder.user.streetAddress}
          ${bikeOrder.user.state} ${bikeOrder.user.postalCode} ${bikeOrder.user.country}`,
        reservationDurationInDays: pricing.data.days,
        pricePerDay: pricing.rentalCost.rate,
        totalPriceWithoutAddons: pricing.rentalCost.total,
        bikeModel: bikeOrder.bikeModel,
        bikeBrand: bikeOrder.bikeBrand,
        tripStart: convertDateFormat(bikeOrder.pickUpDate),
        tripStartTime: bikeOrder.pickUpTime,
        tripEnd: convertDateFormat(bikeOrder.dropOffDate),
        tripEndTime: bikeOrder.dropOffTime,
        tripSubTotal: pricing.subTotal,
        salesTaxLabel: SALES_TAX_CONFIG.label,
        salesTax: pricing.salesTax,
        tripTotal: pricing.total,
        referenceNumber: bikeOrder.id,
        deposit: bikeOrder.insuranceDeposit,
        accessories: isArray(accessories) ? accessories : [],
        roadAssistance: bikeOrder.roadAssistance,
        roadAssistanceTotal: 12 * pricing.data.days,
        insurance: bikeOrder.insuranceName,
        insurancePrice: pricing.coverageCost.rate,
        insuranceTotal: pricing.coverageCost.total,
        insuranceDeposit: pricing.coverageCost.deposit,
      },
    };
    await this.sendEmail(mailConfig);
  }

  public async sendRentRequestToClient(
    bikeOrder: BikeRentalOrder,
    pricing: CalculationResult,
  ) {
    const accessories = pricing.gearCost.gearCost.map((g) => ({
      name: g.title,
      unitPrice: g.unitPrice,
      subTotal: g.subtotal,
      days: pricing.data.days,
    }));

    const mailConfig: MailOptions = {
      to: bikeOrder.user.email,
      template: EmailTemplates.RENT_REQUEST_TO_CLIENT,
      subject: 'Bike Rent Request',
      attachments: [
        {
          path: bikeOrder.bikeImage,
          cid: 'bike-image',
        },
      ],
      context: {
        name: `${bikeOrder.user.firstName} ${bikeOrder.user.lastName}`,
        email: bikeOrder.user.email,
        phone: bikeOrder.user.phoneNumber,
        dateOfBirth: convertDateFormat(bikeOrder.user.dateOfBirth),
        address: `${bikeOrder.user.aptSuite} ${bikeOrder.user.streetAddress}
          ${bikeOrder.user.state} ${bikeOrder.user.postalCode} ${bikeOrder.user.country}`,
        reservationDurationInDays: pricing.data.days,
        pricePerDay: pricing.rentalCost.rate,
        totalPriceWithoutAddons: pricing.rentalCost.total,
        bikeModel: bikeOrder.bikeModel,
        bikeBrand: bikeOrder.bikeBrand,
        tripStart: convertDateFormat(bikeOrder.pickUpDate),
        tripStartTime: bikeOrder.pickUpTime,
        tripEnd: convertDateFormat(bikeOrder.dropOffDate),
        tripEndTime: bikeOrder.dropOffTime,
        tripSubTotal: pricing.subTotal,
        salesTaxLabel: SALES_TAX_CONFIG.label,
        salesTax: pricing.salesTax,
        tripTotal: pricing.total,
        referenceNumber: bikeOrder.id,
        roadAssistance: bikeOrder.roadAssistance,
        roadAssistanceTotal: 12 * pricing.data.days,
        insurance: bikeOrder.insuranceName,
        insurancePrice: pricing.coverageCost.rate,
        insuranceTotal: pricing.coverageCost.total,
        insuranceDeposit: pricing.coverageCost.deposit,
        accessories: isArray(accessories) ? accessories : [],
      },
    };
    await this.sendEmail(mailConfig);
  }

  public async sendVerifyEmail(user: User) {
    const mailConfig: MailOptions = {
      to: user.email,
      template: EmailTemplates.VERIFY_EMAIL,
      subject: 'Miami Motorbike Rental - Verify Email',
      context: {
        name: `${user.firstName} ${user.lastName}`,
        code: user.verificationCode,
        verificationLink: `${environment.frontEndUrl}/verify-email/${user.verificationCode}`,
      },
    };
    await this.sendEmail(mailConfig);
  }

  public async sendBikeOrderVerification(bikeOrder: BikeRentalOrder) {
    const mailConfig: MailOptions = {
      to: bikeOrder.user.email,
      template: EmailTemplates.VERIFY_EMAIL,
      subject: 'Miami Motorbike Rental - Verify Email',
      context: {
        name: `${bikeOrder.user.firstName} ${bikeOrder.user.lastName}`,
        code: bikeOrder.verificationCode,
      },
    };
    await this.sendEmail(mailConfig);
  }

  public async sendVerifyOrder(initialOrder: BikeRentalOrder) {
    const mailConfig: MailOptions = {
      to: initialOrder.user.email,
      template: EmailTemplates.VERIFY_EMAIL,
      subject: 'Miami Motorbike Rental - Verify Email',
      context: {
        name: `${initialOrder.user.firstName} ${initialOrder.user.lastName}`,
        code: initialOrder.verificationCode,
        verificationLink: `${environment.frontEndUrl}/verify-email/${initialOrder.verificationCode}`,
      },
    };
    await this.sendEmail(mailConfig);
  }

  private async sendEmail(options: MailOptions) {
    this.logger.debug('Requesting to send an email ' + new Date().getTime());
    const attachments = options.attachments ?? [];
    attachments.push({
      path: join(
        __dirname,
        '../../../../assets/email-templates/images/email-header.png',
      ),
      cid: 'logo',
    });
    const newOptions: MailOptions = {
      ...options,
      attachments,
      context: {
        ...options.context,
        year: new Date().getFullYear().toString(),
      },
    };
    try {
      await this.mailerService.sendMail(newOptions).then(() => {
        this.logger.debug('Email sent ' + new Date().getTime());
      });
    } catch (err) {
      this.logger.error('Error while sending email', err);
    }
  }
}
