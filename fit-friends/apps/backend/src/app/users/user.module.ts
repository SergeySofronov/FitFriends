import { Logger, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJwtConfig, JwtRefreshStrategy, JwtStrategy, LocalStrategy } from '@fit-friends/core';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { RefreshTokenModule } from '../refresh-token/refresh-token.module';

@Module({
  imports: [
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
})
export class UsersModule { }
