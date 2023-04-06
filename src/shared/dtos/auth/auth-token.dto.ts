import { ApiResponseProperty } from '@nestjs/swagger';
export class AuthTokenPayload {
  @ApiResponseProperty()
  userId: number;

  @ApiResponseProperty()
  firstName: string;

  @ApiResponseProperty()
  lastName: string;
}
