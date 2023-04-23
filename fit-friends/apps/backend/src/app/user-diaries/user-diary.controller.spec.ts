import { Test, TestingModule } from '@nestjs/testing';
import { UserDiaryController } from './user-diary.controller';

describe('UserDiariesController', () => {
  let controller: UserDiaryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserDiaryController],
    }).compile();

    controller = module.get<UserDiaryController>(UserDiaryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
