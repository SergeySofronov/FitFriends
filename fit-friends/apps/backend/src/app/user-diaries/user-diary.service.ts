import { Injectable, Logger } from '@nestjs/common';
import { FoodDiaryRepository } from './food-diary.repository';
import { TrainingDiaryRepository } from './training-diary.repository';
import { CreateFoodDiaryDto } from './dto/create-food-diary.dto';
import { CreateTrainingDiaryDto } from './dto/create-training-diary.dto';
import { FoodDiary, TrainingDiary } from '@fit-friends/shared-types';
import { TrainingDiaryEntity } from './training-diary.entity';
import { FoodDiaryEntity } from './food-diary.entity';
import { UpdateFoodDiaryDto } from './dto/update-food-diary.dto';
import { DiaryRecordNotFoundException, DiaryRecordNotFoundIdException, DiaryRecordNotOwnerIdException } from '@fit-friends/core';
import { UserDiaryType } from './user-diary.constant';
import { UserDiaryQuery } from './query/user-diary.query';

type DiaryRecord = FoodDiary | TrainingDiary;

@Injectable()
export class UserDiaryService {
  constructor(
    private readonly trainingDiaryRepository: TrainingDiaryRepository,
    private readonly foodDiaryRepository: FoodDiaryRepository,
    private readonly logger: Logger,
  ) { }

  private async checkDiaryOwner(diaryId: number, userId: number, diaryType: UserDiaryType): Promise<DiaryRecord> {
    let record: DiaryRecord;
    if (diaryType === UserDiaryType.Food) {
      record = await this.foodDiaryRepository.findById(diaryId);
    } else {
      record = await this.trainingDiaryRepository.findById(diaryId);
    }

    if (!record) {
      throw new DiaryRecordNotFoundIdException(this.logger, diaryId);
    }

    if (userId !== record.userId) {
      throw new DiaryRecordNotOwnerIdException(this.logger, diaryId, userId);
    }

    return record;
  }

  public async createTrainingDiary(dto: CreateTrainingDiaryDto, userId: number): Promise<TrainingDiary> {
    const newRecord = new TrainingDiaryEntity({ ...dto, userId });
    return this.trainingDiaryRepository.create(newRecord);
  }

  public async createFoodDiary(dto: CreateFoodDiaryDto, userId: number): Promise<FoodDiary> {
    const newRecord = new FoodDiaryEntity({ ...dto, userId, date: new Date(dto.date) });
    return this.foodDiaryRepository.create(newRecord);
  }

  public async updateFoodDiary(dto: UpdateFoodDiaryDto, diaryId: number, userId: number): Promise<FoodDiary> {
    await this.checkDiaryOwner(diaryId, userId, UserDiaryType.Food);
    return this.foodDiaryRepository.update(diaryId, { ...dto, date: new Date() });
  }

  async getDiary(query: UserDiaryQuery, diaryType: UserDiaryType): Promise<DiaryRecord[]> {
    let existDiary: DiaryRecord[];
    if (diaryType === UserDiaryType.Food) {
      existDiary = await this.foodDiaryRepository.find(query);
    } else {
      existDiary = await this.trainingDiaryRepository.find(query);
    }

    if (!existDiary?.length) {
      throw new DiaryRecordNotFoundException(this.logger);
    }

    return existDiary;
  }

  public async deleteDiary(diaryId: number, userId: number, diaryType: UserDiaryType) {
    await this.checkDiaryOwner(diaryId, userId, diaryType);
    if (diaryType === UserDiaryType.Food) {
      return this.foodDiaryRepository.destroy(diaryId);
    }
    return this.trainingDiaryRepository.destroy(diaryId);
  }

}
