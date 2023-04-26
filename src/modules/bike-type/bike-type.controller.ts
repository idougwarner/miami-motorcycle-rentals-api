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
import { BikeTypeService } from './bike-type.service';
import { BikeTypeGetResponseDto } from 'src/shared/dtos/bike-type/bike-type-get-response.dto';

@Controller('types')
@ApiTags('BikeType Controller')
export class BikeTypeController {
  constructor(private bikeTypeService: BikeTypeService) {}

  @Get('/')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: [BikeTypeGetResponseDto] })
  @ApiOperation({ summary: 'Get all bike types' })
  public async getAll(): Promise<BikeTypeGetResponseDto[]> {
    return this.bikeTypeService.getAll();
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: BikeTypeGetResponseDto })
  @ApiOperation({ summary: 'Get bike type details' })
  public async getById(
    @Param('id') id: number,
  ): Promise<BikeTypeGetResponseDto> {
    return this.bikeTypeService.getById(id);
  }
}
