import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { RefreshTokenPayload} from '@fit-friends/shared-types';
import { RefreshTokenService } from '../../refresh-token/refresh-token.service';
import { TokenNotExistsException } from '@fit-friends/core';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    private readonly configService: ConfigService,
    private readonly refreshTokenService: RefreshTokenService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('jwt.refreshTokenSecret'),
      passReqToCallback: true,
    });
  }

  public async validate(_req: Request, payload: RefreshTokenPayload) {
    if (! await this.refreshTokenService.isExists(payload.refreshTokenId)) {
      throw new TokenNotExistsException(payload.refreshTokenId);
    }

    return payload;
  }
}
