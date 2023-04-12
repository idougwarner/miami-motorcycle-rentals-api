import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BikeInsurancePlanModule } from '../bike-insurance-plan/bike-insurance-plan.module';
import { BikeModule } from '../bike/bike.module';
import { BikeRentalOrder } from '../entity/bike-rental-order.entity';
import { User } from '../entity/user.entity';
import { MailService } from '../mail/mail.service';
import { UserModule } from '../user/user.module';
import { WPMigrationController } from './wp-migration.controller';
import { WPMigrationService } from './wp-migration.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([BikeRentalOrder, User]),
    UserModule,
    BikeModule,
    BikeInsurancePlanModule,
  ],
  controllers: [WPMigrationController],
  providers: [WPMigrationService],
})
export class WPMigrationModule {}
