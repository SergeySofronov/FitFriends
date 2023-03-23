import { Entity } from '@fit-friends/core';
import { Training, TrainingStyle, TrainingStyleType, TrainingTime, TrainingTimeType, UserGender, UserGenderType, UserLevel, UserLevelType } from '@fit-friends/shared-types';
import { Injectable } from '@nestjs/common'
import { TrainingValidity } from './training.constant';

@Injectable()
export class TrainingEntity implements Entity<TrainingEntity, Training>, Training {
  public id?: number;
  public title: string;
  public backgroundImage: string;
  public level: UserLevelType;
  public trainingStyle: TrainingStyleType;
  public trainingTime: TrainingTimeType;
  public price: number;
  public caloriesLoss: number;
  public description: string;
  public gender: UserGenderType;
  public video: string;
  public rating: number;
  public coachId: number;
  public isSpecial: boolean;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(training: Training) {
    this.fillEntity(training);
  }

  public toObject() {
    return { ...this };
  }

  public fillEntity(training: Training) {
    this.id = training.id;
    this.title = training.title;
    this.backgroundImage = training.backgroundImage;
    this.level = training.level || UserLevel.Beginner;
    this.trainingStyle = training.trainingStyle || TrainingStyle.Aerobics;
    this.trainingTime = training.trainingTime || TrainingTime.Max30;
    this.price = training.price || TrainingValidity.PriceMinValue;
    this.caloriesLoss = training.caloriesLoss || TrainingValidity.CaloriesLossMinValue;
    this.description = training.description;
    this.gender = training.gender || UserGender.Indifferent;
    this.video = training.video;
    this.rating = TrainingValidity.DefaultRating;
    this.coachId = training.coachId;
    this.isSpecial = training.isSpecial;
    this.createdAt = training.createdAt || new Date();
    this.updatedAt = training.updatedAt || new Date();
  }
}
