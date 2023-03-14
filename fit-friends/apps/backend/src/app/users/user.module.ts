import { Logger, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJwtConfig, JwtStrategy, LocalStrategy } from '@fit-friends/core';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [
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
    Logger
  ],
})
export class UsersModule { }
