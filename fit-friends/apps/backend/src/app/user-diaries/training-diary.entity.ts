import { Injectable } from '@nestjs/common'
import { TrainingDiary } from '@fit-friends/shared-types'
import { Entity } from '@fit-friends/core';

@Injectable()
export class TrainingDiaryEntity implements Entity<TrainingDiaryEntity, TrainingDiary>, TrainingDiary {
  public id?: number;
  public userId: number;
  public trainingId: number;
  public date?: Date;

  constructor(diary: TrainingDiary) {
    this.fillEntity(diary);
  }

  public toObject() {
    return { ...this };
  }

  public fillEntity(diary: TrainingDiary) {
    this.id = diary.id;
    this.userId = diary.userId;
    this.trainingId = diary.trainingId;
    this.date = new Date();
  }
}
