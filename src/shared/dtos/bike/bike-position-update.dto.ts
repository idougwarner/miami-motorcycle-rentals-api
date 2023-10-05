import { IsInt, IsNotEmpty } from 'class-validator';

export class BikePositionUpdateRequestDto {
  @IsNotEmpty()
  @IsInt()
  bikeId: number;

  @IsNotEmpty()
  @IsInt()
  position: number;
}
