import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  UpdateUserDetailsRequest,
  UserResponse,
  VerifyAccountRequest,
} from '../../shared/dtos';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('User Controller')
export class UserController {
  constructor(private userService: UserService) {}

  @Patch('/verify')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: VerifyAccountRequest })
  @ApiResponse({ status: HttpStatus.OK, type: UserResponse })
  @ApiOperation({ summary: 'Verify account' })
  async verifyAccount(@Body() request: VerifyAccountRequest) {
    return this.userService.verifyAccount(request);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: UpdateUserDetailsRequest })
  @ApiResponse({ status: HttpStatus.OK, type: UserResponse })
  @ApiOperation({
    summary: 'Update customer details',
  })
  public async updateCustomerDetails(
    @Param('id') id: number,
    @Body() body: UpdateUserDetailsRequest,
  ): Promise<UserResponse> {
    return this.userService.updateUserDetails(id, body);
  }
}
