import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from '../../guards/local-auth.guard';
import { AuthService } from './auth.service';
import {
  ApiBody,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { LoginDto } from '../../shared/dtos';
import { string } from 'joi';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { UserDetailsResponseDto } from 'src/shared/dtos/user/user-details-response.dto';
import { UserService } from '../user/user.service';

@ApiTags('Auth Controller')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginDto })
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: HttpStatus.OK, type: string })
  public async login(@Request() req) {
    const token = await this.authService.login(req.user);
    return token;
  }

  @Get('/current-user')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: UserDetailsResponseDto })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Returns current logged in user' })
  public async getCurrentUser(@Request() req): Promise<UserDetailsResponseDto> {
    return await this.userService.getCurrentUserById(req.user.userId);
  }
}
