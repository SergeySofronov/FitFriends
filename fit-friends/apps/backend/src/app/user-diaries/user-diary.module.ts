import { Logger, Module } from '@nestjs/common';
import { UserDiaryService } from './user-diary.service';
import { UserDiaryController } from './user-diary.controller';
import { FoodDiaryRepository } from './food-diary.repository';
import { TrainingDiaryRepository } from './training-diary.repository';

@Module({
  providers: [
    UserDiaryService,
    FoodDiaryRepository,
    TrainingDiaryRepository,
    Logger
  ],
  controllers: [UserDiaryController],
})
export class UserDiaryModule { }
