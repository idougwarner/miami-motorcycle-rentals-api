import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import {
  BikeInsuranceResponseDto,
  InsuranceRequestDto,
  WpBikeResponse,
} from '../../shared/dtos';
import { BikeResponse } from '../../shared/dtos/bike/bike-response.dto';
import { BikeService } from './bike.service';

@Controller('bike')
@ApiTags('Bike Controller')
export class BikeController {
  constructor(private bikeService: BikeService) {}

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: WpBikeResponse })
  @ApiOperation({ summary: 'Get bike details from wordpress' })
  public async getById(@Param('id') id: number): Promise<WpBikeResponse> {
    return this.bikeService.getWpBikeDetails(id);
  }

  @Get('/:wpId/details')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: BikeResponse })
  @ApiOperation({
    summary: 'Get bike details  by bike wordpress id',
  })
  public async getBikeDetails(
    @Param('wpId') id: number,
  ): Promise<BikeResponse> {
    return this.bikeService.getBikeDetailsByWordpressId(id);
  }

  @Patch('/:wpId/insurance')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiBody({ type: InsuranceRequestDto })
  @ApiResponse({ status: HttpStatus.OK, type: BikeInsuranceResponseDto })
  @ApiOperation({
    summary: 'Get bike details  by bike wordpress id',
  })
  public async updateBikeInsurance(
    @Param('wpId') id: number,
    @Body() insurance: InsuranceRequestDto,
  ): Promise<BikeInsuranceResponseDto> {
    return this.bikeService.updateBikeInsurance(id, insurance);
  }
}
