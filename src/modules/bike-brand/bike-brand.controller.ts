import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BikeBrandService } from './bike-brand.service';
import { BikeBrandGetResponseDto } from 'src/shared/dtos/bike-brand/bike-brand-get-response.dto';

@Controller('brands')
@ApiTags('BikeBrand Controller')
export class BikeBrandController {
  constructor(private bikeBrandService: BikeBrandService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: [BikeBrandGetResponseDto] })
  @ApiOperation({ summary: 'Get all brands' })
  public async getAll(): Promise<BikeBrandGetResponseDto[]> {
    return this.bikeBrandService.getAll();
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
}
