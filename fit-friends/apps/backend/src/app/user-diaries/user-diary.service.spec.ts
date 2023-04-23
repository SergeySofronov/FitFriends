import { Test, TestingModule } from '@nestjs/testing';
import { UserDiaryService } from './user-diary.service';

describe('UserDiariesService', () => {
  let service: UserDiaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserDiaryService],
    }).compile();

    service = module.get<UserDiaryService>(UserDiaryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
