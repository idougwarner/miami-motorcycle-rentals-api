import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { BikeBrandService } from './bike-brand.service';
import { BikeBrandGetResponseDto } from 'src/shared/dtos/bike-brand/bike-brand-get-response.dto';

@Controller('brands')
@ApiTags('BikeBrand Controller')
export class BikeBrandController {
  constructor(private bikeBrandService: BikeBrandService) {}

  @Get('/')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: [BikeBrandGetResponseDto] })
  @ApiOperation({ summary: 'Get all brands' })
  public async getAll(): Promise<BikeBrandGetResponseDto[]> {
    return this.bikeBrandService.getAll();
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: BikeBrandGetResponseDto })
  @ApiOperation({ summary: 'Get brand details' })
  public async getById(
    @Param('id') id: number,
  ): Promise<BikeBrandGetResponseDto> {
    return this.bikeBrandService.getById(id);
  }
}
