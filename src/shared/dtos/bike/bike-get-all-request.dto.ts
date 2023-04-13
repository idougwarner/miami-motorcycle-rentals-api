import { ApiProperty } from '@nestjs/swagger';

export class GetAllBikesRequestDto {
  @ApiProperty({ description: 'Filter by type', required: false })
  type_id?: number;

  @ApiProperty({ description: 'Filter by brand', required: false })
  brand_id?: number;
}
