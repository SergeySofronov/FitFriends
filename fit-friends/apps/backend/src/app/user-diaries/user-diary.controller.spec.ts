import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UserDiaryController } from './user-diary.controller';
import { UserDiaryService } from './user-diary.service';
import { FoodDiaryRepository } from './food-diary.repository';
import { TrainingDiaryRepository } from './training-diary.repository';
import { PrismaService } from '../prisma/prisma.service';

describe('UserDiariesController', () => {
  let controller: UserDiaryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserDiaryController],
      providers: [
        PrismaService,
        UserDiaryService,
        FoodDiaryRepository,
        TrainingDiaryRepository,
        Logger
      ],
    }).compile();

    controller = module.get<UserDiaryController>(UserDiaryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
