import { ConfigModule, ConfigService } from '@nestjs/config';
import { getTrainingVideoUploadConfig } from '@fit-friends/core';
import { Logger, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express/multer';
import { TrainingService } from './training.service';
import { TrainingController } from './training.controller';
import { UsersModule } from '../users/user.module';
import { TrainingRepository } from './training.repository';
import { UserBalanceModule } from '../user-balance/user-balance.module';

@Module({
  imports: [
    UsersModule,
    UserBalanceModule,
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: getTrainingVideoUploadConfig,
      inject: [ConfigService],
    }),
  ],
  controllers: [TrainingController],
  providers: [
    TrainingService,
    TrainingRepository,
    Logger
  ],
  exports: [
    TrainingService
  ]
})
export class TrainingModule { }
