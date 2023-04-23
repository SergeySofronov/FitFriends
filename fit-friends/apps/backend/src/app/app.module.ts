import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/user.module';
import {
  fileUploadOptions,
  frontendUrlOptions,
  jwtOptions,
  mailOptions,
} from '@fit-friends/core';
import { ENV_FILE_PATH } from './app.constant';
import { envValidationSchema } from './env.validation.schema';
import { RefreshTokenModule } from './refresh-token/refresh-token.module';
import { join } from 'path';
import { TrainingModule } from './training/training.module';
import { ReviewsModule } from './reviews/review.module';
import { GymsModule } from './gyms/gym.module';
import { OrderModule } from './orders/order.module';
import { NotifyModule } from './notify/notify.module';
import { RequestModule } from './requests/request.module';
import { UserDiaryModule } from './user-diaries/user-diary.module';
import { UserBalanceModule } from './user-balance/user-balance.module';
import { MailModule } from './mail/mail.module';

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
      load: [jwtOptions, fileUploadOptions, frontendUrlOptions, mailOptions],
      validationSchema: envValidationSchema,
    }),
    PrismaModule,
    UsersModule,
    RefreshTokenModule,
    TrainingModule,
    ReviewsModule,
    GymsModule,
    OrderModule,
    NotifyModule,
    RequestModule,
    UserBalanceModule,
    UserDiaryModule,
    MailModule,
  ],
})
export class AppModule { }
