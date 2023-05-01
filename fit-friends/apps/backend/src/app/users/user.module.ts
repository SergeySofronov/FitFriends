import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { getJwtConfig } from '@fit-friends/core';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { RefreshTokenModule } from '../refresh-token/refresh-token.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { NotifyModule } from '../notify/notify.module';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    MailModule,
    NotifyModule,
    PassportModule,
    RefreshTokenModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    JwtStrategy,
    LocalStrategy,
    JwtRefreshStrategy,
    Logger
  ],
  exports: [UserService]
})
export class UsersModule { }
