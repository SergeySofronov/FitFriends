import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/user.module';
import {
  fileUploadOptions,
  frontendUrlOptions,
  jwtOptions,
} from '@fit-friends/core';
import { ENV_FILE_PATH } from './app.constant';
import { envValidationSchema } from './env.validation.schema';
import { RefreshTokenModule } from './refresh-token/refresh-token.module';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [jwtOptions, fileUploadOptions, frontendUrlOptions],
      validationSchema: envValidationSchema,
    }),
    UsersModule,
    RefreshTokenModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
