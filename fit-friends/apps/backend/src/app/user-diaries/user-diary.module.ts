import { Module } from '@nestjs/common';
import { UserDiaryService } from './user-diary.service';
import { UserDiaryController } from './user-diary.controller';

@Module({
  providers: [UserDiaryService],
  controllers: [UserDiaryController],
})
export class UserDiaryModule {}
