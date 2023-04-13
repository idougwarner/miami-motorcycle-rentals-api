import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
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
import { BikeResponse } from '../../shared/dtos/bike/bike-response.dto';
import { BikeService } from './bike.service';
import { GetAllBikesRequestDto } from 'src/shared/dtos/bike/bike-get-all-request.dto';
import { BikeGetAllResponseDto } from 'src/shared/dtos/bike/bike-get-all-response.dto';
import { BikeGetResponseDto } from 'src/shared/dtos/bike/bike-get-response.dto';

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
    return this.bikeService.getById(id);
  }

  @Get('/:id/media_items')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get a bike Media Items' })
  public async getMediaItemsById(@Param('id') id: number) {
    return this.bikeService.getMediaItemsById(id);
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
