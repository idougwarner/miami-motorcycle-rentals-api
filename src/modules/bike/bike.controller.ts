import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
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
} from '../../shared/dtos';
import { BikeService } from './bike.service';
import { GetAllBikesRequestDto } from 'src/shared/dtos/bike/bike-get-all-request.dto';
import { BikeGetAllResponseDto } from 'src/shared/dtos/bike/bike-get-all-response.dto';
import { BikeGetResponseDto } from 'src/shared/dtos/bike/bike-get-response.dto';
import { BikeResponse } from 'src/shared/dtos/bike/bike-response.dto';
import { BikeCreateRequestDto } from 'src/shared/dtos/bike/bike-create-request.dto';
import { Bike } from '../entity/bike.entity';

@Controller('bikes')
@ApiTags('Bike Controller')
export class BikeController {
  constructor(private bikeService: BikeService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: [BikeGetAllResponseDto] })
  @ApiOperation({ summary: 'Get all bikes' })
  public async getAll(
    @Query() params: GetAllBikesRequestDto,
  ): Promise<BikeGetAllResponseDto[]> {
    const { type_id, brand_id } = params;
    return this.bikeService.getAllBikes(type_id, brand_id);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: BikeGetResponseDto })
  @ApiOperation({ summary: 'Get bike details' })
  public async getById(@Param('id') id: number): Promise<BikeGetResponseDto> {
    return this.bikeService.getDetailsById(id);
  }

  @Get('/:id/insurances')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: BikeResponse })
  @ApiOperation({ summary: 'Get a bike details with insurances' })
  public async getWithInsurancesById(
    @Param('id') id: number,
  ): Promise<BikeResponse> {
    return this.bikeService.getBikeWithInsurancesById(id);
  }

  @Get('/:id/media_items')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get a bike Media Items' })
  public async getMediaItemsById(@Param('id') id: number) {
    return this.bikeService.getMediaItemsById(id);
  }

  @Patch('/:bikeId/insurance/:insuranceId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiBody({ type: InsuranceRequestDto })
  @ApiResponse({ status: HttpStatus.OK, type: BikeInsuranceResponseDto })
  @ApiOperation({
    summary: 'Patch a bike insurance by bike id',
  })
  public async updateBikeInsurance(
    @Param('bikeId') bikeId: number,
    @Param('insuranceId') insuranceId: number,
    @Body() insurance: InsuranceRequestDto,
  ): Promise<BikeInsuranceResponseDto> {
    return this.bikeService.updateBikeInsurance(bikeId, insuranceId, insurance);
  }

  @Post('/create')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiBody({ type: BikeCreateRequestDto })
  @ApiResponse({ status: HttpStatus.OK, type: Bike })
  @ApiOperation({
    summary: 'Patch a bike insurance by bike id',
  })
  public async createBike(@Body() body: BikeCreateRequestDto): Promise<Bike> {
    return this.bikeService.createBike(body);
  }
}
