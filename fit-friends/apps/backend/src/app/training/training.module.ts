import { Logger, Module } from '@nestjs/common';
import { TrainingService } from './training.service';
import { TrainingController } from './training.controller';
import { JwtStrategy } from '@fit-friends/core';

@Module({
  controllers: [TrainingController],
  providers: [
    TrainingService,
    JwtStrategy,
    Logger
  ],
})
export class TrainingModule {}
