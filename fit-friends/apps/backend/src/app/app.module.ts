import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
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
import { join } from 'path';
import { TrainingModule } from './training/training.module';
import { ReviewsModule } from './reviews/review.module';
import { GymsModule } from './gyms/gym.module';
import { OrderModule } from './orders/order.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'assets'),
      serveStaticOptions: {
        redirect: false,
        index: false,
      },
    }),
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [jwtOptions, fileUploadOptions, frontendUrlOptions],
      validationSchema: envValidationSchema,
    }),
    PrismaModule,
    UsersModule,
    RefreshTokenModule,
    TrainingModule,
    ReviewsModule,
    GymsModule,
    OrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
