import { Logger, Module } from '@nestjs/common';
import { TrainingService } from './training.service';
import { TrainingController } from './training.controller';
import { JwtStrategy } from '@fit-friends/core';
import { UsersModule } from '../users/user.module';
import { TrainingRepository } from './training.repository';

@Module({
  imports: [
    UsersModule
  ],
  controllers: [TrainingController],
  providers: [
    TrainingService,
    TrainingRepository,
    JwtStrategy,
    Logger
  ],
})
export class TrainingModule { }
