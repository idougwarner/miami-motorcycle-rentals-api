import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BikeInsurancePlanModule } from '../bike-insurance-plan/bike-insurance-plan.module';
import { BikeModule } from '../bike/bike.module';
import { BikeRentalOrder } from '../entity/bike-rental-order.entity';
import { User } from '../entity/user.entity';
import { MailService } from '../mail/mail.service';
import { UserModule } from '../user/user.module';
import { BikeRentalOrderController } from './bike-rental-order.controller';
import { BikeRentalOrderRepository } from './bike-rental-order.repository';
import { BikeRentalOrderService } from './bike-rental-order.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([BikeRentalOrder, User]),
    UserModule,
    BikeModule,
    BikeInsurancePlanModule,
  ],
  controllers: [BikeRentalOrderController],
  providers: [BikeRentalOrderService, BikeRentalOrderRepository, MailService],
  exports: [BikeRentalOrderService, BikeRentalOrderRepository],
})
export class BikeRentalOrderModule {}
