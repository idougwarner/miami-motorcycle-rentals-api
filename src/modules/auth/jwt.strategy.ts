import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { AppConstants } from '../../shared/common';
import { AuthTokenPayload } from '../../shared/dtos';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: AppConstants.JWT_SECRET,
      ignoreExpiration: false,
    });
  }

  async validate(payload: AuthTokenPayload) {
    return {
      userId: payload.userId,
      firstName: payload.firstName,
      lastName: payload.lastName,
    };
  }
}
