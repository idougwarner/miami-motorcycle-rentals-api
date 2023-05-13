import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Body,
  Param,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateStripePaymentIntentRequestDto } from '../../shared/dtos';
import { BikeService } from '../bike/bike.service';
import { StripeService } from './stripe.service';

@Controller('stripe')
@ApiTags('Stripe Controller')
export class StripeController {
  constructor(
    private stripeService: StripeService,
    private bikeService: BikeService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: CreateStripePaymentIntentRequestDto })
  @ApiResponse({ status: HttpStatus.OK })
  @ApiOperation({
    summary: 'Creation of stripe payment intent',
  })
  @Post('/:orderId')
  public async createPaymentIntent(
    @Param('orderId') id: number,
    @Body() body: CreateStripePaymentIntentRequestDto,
  ) {
    const bikeDetails = await this.bikeService.getBikeDetailsForOrder(
      body.bikeId,
    );

    return await this.stripeService.createPaymentIntent(id, body, bikeDetails);
  }
}
