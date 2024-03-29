import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RefreshTokenRepository } from './refresh-token.repository';
import { RefreshTokenEntity } from './refresh-token.entity';
import { RefreshTokenPayload } from '@fit-friends/shared-types';
import dayjs from 'dayjs';
import { ManipulateType } from 'dayjs';

@Injectable()
export class RefreshTokenService {
  constructor(
    private readonly configService: ConfigService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) { }

  public async createRefreshSession(payload: RefreshTokenPayload) {
    const count = +this.configService.get<string>('jwt.refreshTokenExpiresIn').slice(0, -1);
    const unit = this.configService.get<string>('jwt.refreshTokenExpiresIn').at(-1);
    const refreshToken = new RefreshTokenEntity({
      tokenId: payload.refreshTokenId,
      createdAt: new Date(),
      userId: payload.sub,
      expiresIn: dayjs().add(count, unit as ManipulateType).toDate()
    });

    return this.refreshTokenRepository.create(refreshToken);
  }

  public async deleteRefreshSession(tokenId: string) {
    if (tokenId) {
      await this.refreshTokenRepository.deleteByTokenId(tokenId);
    }
    return this.deleteExpiredRefreshTokens();
  }

  public async isExists(tokenId: string): Promise<boolean> {
    const refreshToken = await this.refreshTokenRepository.findByTokenId(tokenId);
    return (refreshToken !== null);
  }

  public async deleteExpiredRefreshTokens() {
    return this.refreshTokenRepository.deleteExpiredTokens();
  }

  public async deleteRefreshTokens(userId: number) {
    return this.refreshTokenRepository.deleteAll(userId);
  }
}
