import { Module } from '@nestjs/common';
import { RefreshTokenRepository } from './refresh-token.repository';
import { RefreshTokenService } from './refresh-token.service';

@Module({
  providers: [
    RefreshTokenService,
    RefreshTokenRepository,
  ],
  exports: [
    RefreshTokenService,
  ]
})
export class RefreshTokenModule { }
