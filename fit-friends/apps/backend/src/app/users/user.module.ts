import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { getAvatarUploadConfig, getJwtConfig, JwtRefreshStrategy, JwtStrategy, LocalStrategy } from '@fit-friends/core';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { RefreshTokenModule } from '../refresh-token/refresh-token.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    PassportModule,
    RefreshTokenModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: getAvatarUploadConfig,
      inject: [ConfigService],
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
  exports: [UserRepository]
})
export class UsersModule { }
