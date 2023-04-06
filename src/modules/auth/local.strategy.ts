import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../entity/user.entity';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<User> {
    if (!username || !password) {
      throw new BadRequestException();
    }
    const user = await this.authService.getAuthenticatedUser(
      username,
      password,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    delete user.password;
    return user;
  }
}
