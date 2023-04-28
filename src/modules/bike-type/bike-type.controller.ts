import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BikeTypeService } from './bike-type.service';
import { BikeTypeGetResponseDto } from 'src/shared/dtos/bike-type/bike-type-get-response.dto';

@Controller('types')
@ApiTags('BikeType Controller')
export class BikeTypeController {
  constructor(private bikeTypeService: BikeTypeService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: [BikeTypeGetResponseDto] })
  @ApiOperation({ summary: 'Get all bike types' })
  public async getAll(): Promise<BikeTypeGetResponseDto[]> {
    return this.bikeTypeService.getAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: BikeTypeGetResponseDto })
  @ApiOperation({ summary: 'Get bike type details' })
  public async getById(
    @Param('id') id: number,
  ): Promise<BikeTypeGetResponseDto> {
    return this.bikeTypeService.getById(id);
  }
}
