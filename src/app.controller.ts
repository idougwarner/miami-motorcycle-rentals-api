import { Body, Controller, Post } from '@nestjs/common';
import { Stripe } from 'stripe';

@Controller()
export class AppController {
  sk = process.env.STRIPE_SECRET_KEY;

  config: Stripe.StripeConfig = { apiVersion: '2022-08-01' };

  stripe = new Stripe(this.sk, this.config);

  constructor() {}

  @Post()
  async createProduct() {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: 1000,
      currency: 'usd',
      capture_method: 'manual',
      payment_method_types: ['card'],
    });

    return { paymentIntent };
  }

  @Post('payment')
  async updatePayment(@Body() body) {
    const intent = await this.stripe.paymentIntents.update(
      body.paymentIntentId,
      {
        payment_method: body.paymentMethodId,
      },
    );

    return intent;
  }
}
