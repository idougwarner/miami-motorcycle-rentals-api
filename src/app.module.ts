import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransformInterceptor } from './core/interceptors/transform.interceptor';
import 'dotenv/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './modules/entity';
import { BikeRentalOrderModule } from './modules/bike-rental-order/bike-rental-order.module';
import { UserModule } from './modules/user/user.module';
import { MailModule } from './modules/mail/mail.module';
import { BikeModule } from './modules/bike/bike.module';
import { StripeModule } from './modules/stripe/stripe.module';
import { ConstraintsNamingStrategy } from './core/constraints-naming-strategy';
import { AuthModule } from './modules/auth/auth.module';
import { BikeInsurancePlanModule } from './modules/bike-insurance-plan/bike-insurance-plan.module';

@Module({
  imports: [
    AuthModule,
    BikeModule,
    UserModule,
    MailModule,
    StripeModule,
    BikeRentalOrderModule,
    BikeInsurancePlanModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: entities,
      synchronize: false,
      namingStrategy: new ConstraintsNamingStrategy(),
      logging: false,
    }),

    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DB_PORT: Joi.number()
          .required()
          .error(
            new Error(
              `Please make sure the attribute "DB_PORT" is set in the .env file and contains a value. Check the example.env for additional attributes you might need`,
            ),
          ),
        DB_HOST: Joi.string()
          .required()
          .error(
            new Error(
              `Please make sure the attribute "DB_HOST" is set in the .env file and contains a value. Check the example.env for additional attributes you might need`,
            ),
          ),
        DB_USER: Joi.string()
          .required()
          .error(
            new Error(
              `Please make sure the attribute "DB_USER" is set in the .env file and contains a value. Check the example.env for additional attributes you might need`,
            ),
          ),
        DB_PASSWORD: Joi.string()
          .required()
          .error(
            new Error(
              `Please make sure the attribute "DB_PASSWORD" is set in the .env file and contains a value. Check the example.env for additional attributes you might needD`,
            ),
          ),
        DB_NAME: Joi.string()
          .required()
          .error(
            new Error(
              `Please make sure the attribute "DB_NAME" is set in the .env file and contains a value. Check the example.env for additional attributes you might need`,
            ),
          ),
        AWS_BUCKET_NAME: Joi.string()
          .required()
          .error(
            new Error(
              `Please make sure the attribute "AWS_BUCKET_NAME" is set in the .env file and contains a value. Check the example.env for additional attributes you might need`,
            ),
          ),
        AWS_BUCKET_REGION: Joi.string()
          .required()
          .error(
            new Error(
              `Please make sure the attribute "AWS_BUCKET_REGION" is set in the .env file and contains a value. Check the example.env for additional attributes you might need`,
            ),
          ),
        AWS_ACCESS_KEY: Joi.string()
          .required()
          .error(
            new Error(
              `Please make sure the attribute "AWS_ACCESS_KEY" is set in the .env file and contains a value. Check the example.env for additional attributes you might need`,
            ),
          ),
        AWS_SECRET_KEY: Joi.string()
          .required()
          .error(
            new Error(
              `Please make sure the attribute "AWS_SECRET_KEY" is set in the .env file and contains a value. Check the example.env for additional attributes you might need`,
            ),
          ),
        AWS_S3_ENDPOINT: Joi.string()
          .required()
          .error(
            new Error(
              `Please make sure the attribute "AWS_S3_ENDPOINT" is set in the .env file and contains a value. Check the example.env for additional attributes you might need`,
            ),
          ),
        AWS_API_VERSION: Joi.string()
          .required()
          .error(
            new Error(
              `Please make sure the attribute "AWS_API_VERSION" is set in the .env file and contains a value. Check the example.env for additional attributes you might need`,
            ),
          ),
        SENDER_EMAIL: Joi.string()
          .required()
          .error(
            new Error(
              `Please make sure the attribute "SENDER_EMAIL" is set in the .env file and contains a value. Check the example.env for additional attributes you might need`,
            ),
          ),
        STORE_OWNER: Joi.string()
          .required()
          .error(
            new Error(
              `Please make sure the attribute "STORE_OWNER" is set in the .env file and contains a value. Check the example.env for additional attributes you might need`,
            ),
          ),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {}
