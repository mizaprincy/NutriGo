import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './interface/jwt-payload.interface';

const secret = process.env.JWT_KEY;
if (!secret) {
  throw new Error('JWT_SECRET is not defined in .env');
}
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret!,
    });
  }

  validate(payload: JwtPayload) {
    return {
      user_id: payload.user_id,
      email: payload.email,
      first_name: payload.first_name,
      last_name: payload.last_name,
      role: payload.role,
    };
  }
}
