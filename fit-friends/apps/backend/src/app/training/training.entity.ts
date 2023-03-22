import { Entity } from '@fit-friends/core';
import { Training, TrainingStyle, TrainingTime, UserGenderType, UserLevelType } from '@fit-friends/shared-types';
import { Injectable } from '@nestjs/common'

@Injectable()
export class TrainingEntity implements Entity<TrainingEntity, Training>, Training {
  public id?: number;
  public title: string;
  public backgroundImage: string;
  public level: UserLevelType;
  public trainingStyle: TrainingStyle;
  public trainingTime: TrainingTime;
  public price: number;
  public caloriesLoss: number;
  public description: string;
  public gender: UserGenderType;
  public video: string;
  public rating: number;
  public coachId: number;
  public isSpecial: boolean;

  constructor(Training: Training) {
    this.fillEntity(Training);
  }

  public toObject() {
    return { ...this };
  }

  public fillEntity(training: Training) {
    this.id = training.id;
    this.title = training.title;
    this.backgroundImage = training.backgroundImage;
    this.level =
    this.trainingStyle: TrainingStyle;
    this.trainingTime: TrainingTime;
    this.price: number;
    this.caloriesLoss: number;
    this.description: string;
    this.gender: UserGenderType;
    this.video: string;
    this.rating: number;
    this.coachId: number;
    this.isSpecial: boolean;

    this.email = training.email;
    this.avatar = training.avatar;
    this.name = training.name;
    this.role = TrainingRole.Training;
    this.password = training.password;
    this.gender = training.gender || TrainingGender.Indifferent;
    this.dateBirth = training.dateBirth;
    this.role = training.role || TrainingRole.Training;
    this.location = training.location;
    this.level = training.level || TrainingLevel.Beginner;
    this.trainingStyle = training.trainingStyle || TrainingStyle.Aerobics;
    this.features = training.features;
    this.createdAt = training.createdAt || new Date();
    this.updatedAt = training.updatedAt || new Date();
  }
}
