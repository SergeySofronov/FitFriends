import { Injectable } from '@nestjs/common'
import { genSalt, hash, compare } from 'bcrypt';
import { SALT_ROUNDS, UserValidity } from './user.constant';
import { User, UserRole, UserRoleType } from '@fit-friends/shared-types'
import { Entity } from '@fit-friends/core';
import { TrainingStyle, TrainingStyleType } from 'libs/shared-types/src/lib/training-style.enum';
import { UserLevel, UserLevelType } from 'libs/shared-types/src/lib/user-level.enum';
import { LocationType } from 'libs/shared-types/src/lib/user-location.enum';
import { TrainingTime, TrainingTimeType } from 'libs/shared-types/src/lib/user-training-time.enum';
import { UserGender, UserGenderType } from 'libs/shared-types/src/lib/user-sex.enum';

@Injectable()
export class UserEntity implements Entity<UserEntity, User>, User {
  public id?: number;
  public name: string;
  public email: string;
  public avatar: string;
  public password: string;
  public gender: UserGenderType;
  public dateBirth: Date;
  public role: UserRoleType;
  public location: LocationType;
  public level: UserLevelType;
  public trainingStyle: TrainingStyleType;
  public trainingTime: TrainingTimeType;
  public caloriesLoss: number;
  public caloriesLossPerDay: number;
  public isReadyForTraining: boolean;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(user: Partial<User>) {
    this.fillEntity(user);
  }

  public async setPassword(password: string): Promise<UserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.password = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.password);
  }

  public toObject() {
    return { ...this };
  }

  public fillEntity(user: Partial<User>) {
    this.id = user.id;
    this.email = user.email;
    this.avatar = user.avatar;
    this.name = user.name;
    this.role = UserRole.User;
    this.password = user.password;
    this.gender = user.gender || UserGender.Indifferent;
    this.dateBirth = user.dateBirth;
    this.role = user.role || UserRole.User;
    this.location = user.location;
    this.level = user.level || UserLevel.Beginner;
    this.trainingStyle = user.trainingStyle || TrainingStyle.Aerobics;
    this.trainingTime = user.trainingTime || TrainingTime.Max30;
    this.caloriesLoss = user.caloriesLoss || UserValidity.caloriesLossMinValue;
    this.caloriesLossPerDay = user.caloriesLossPerDay || UserValidity.caloriesLossPerDayMinValue;
    this.isReadyForTraining = user.isReadyForTraining || true;
    this.createdAt = user.createdAt || new Date();
    this.updatedAt = user.updatedAt || new Date();
  }
}
