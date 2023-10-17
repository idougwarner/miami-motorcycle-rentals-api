import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BikeBrandService } from './bike-brand.service';
import { BikeBrandGetResponseDto } from 'src/shared/dtos/bike-brand/bike-brand-get-response.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { BikeBrandCreateResponseDto } from 'src/shared/dtos/bike-brand/bike-brand-create-response.dto';
import { BikeBrandCreateRequestDto } from 'src/shared/dtos/bike-brand/bike-brand-create-request.dto';
import { BikeBrandUpdateResponseDto } from 'src/shared/dtos/bike-brand/bike-brand-update-response.dto';
import { BikeBrandUpdateRequestDto } from 'src/shared/dtos/bike-brand/bike-brand-update-request.dto';

@Controller('brands')
@ApiTags('BikeBrand Controller')
export class BikeBrandController {
  constructor(private bikeBrandService: BikeBrandService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: [BikeBrandGetResponseDto] })
  @ApiOperation({ summary: 'Get all brands' })
  public async getAll(
    @Query() params: { isAll: number },
  ): Promise<BikeBrandGetResponseDto[]> {
    const { isAll = 0 } = params;
    return this.bikeBrandService.getAll(isAll);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: BikeBrandGetResponseDto })
  @ApiOperation({ summary: 'Get brand details' })
  public async getById(
    @Param('id') id: number,
  ): Promise<BikeBrandGetResponseDto> {
    return this.bikeBrandService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiResponse({ status: HttpStatus.CREATED, type: BikeBrandCreateResponseDto })
  @ApiOperation({ summary: 'Create a brand' })
  public async createBrand(
    @Body() createBrandDto: BikeBrandCreateRequestDto,
  ): Promise<BikeBrandCreateResponseDto> {
    return this.bikeBrandService.createBrand(createBrandDto);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiResponse({ status: HttpStatus.OK, type: BikeBrandUpdateResponseDto })
  @ApiOperation({ summary: 'Update a brand' })
  public async updateBrand(
    @Param('id') id: number,
    @Body() updateBrandDto: BikeBrandUpdateRequestDto,
  ): Promise<BikeBrandUpdateResponseDto> {
    return this.bikeBrandService.updateBrand(id, updateBrandDto);
  }
}
