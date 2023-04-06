import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import { HttpModule } from '@nestjs/axios';
import { BikeModule } from '../bike/bike.module';
import { BikeInsurancePlanModule } from '../bike-insurance-plan/bike-insurance-plan.module';
import { BikeRentalOrderModule } from '../bike-rental-order/bike-rental-order.module';

@Module({
  imports: [
    HttpModule,
    BikeModule,
    BikeRentalOrderModule,
    BikeInsurancePlanModule,
  ],
  providers: [StripeService],
  controllers: [StripeController],
  exports: [StripeService],
})
export class StripeModule {}
