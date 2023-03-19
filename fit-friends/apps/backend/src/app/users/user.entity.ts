import { Injectable } from '@nestjs/common'
import { genSalt, hash, compare } from 'bcrypt';
import { Features, LocationType, TrainingStyle, TrainingStyleType, User, UserGender, UserGenderType, UserLevel, UserLevelType, UserRole, UserRoleType } from '@fit-friends/shared-types'
import { Entity } from '@fit-friends/core';
import { SALT_ROUNDS } from './user.constant';

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
  public features: Features;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(user: User) {
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

  public fillEntity(user: User) {
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
    this.features = user.features;
    this.createdAt = user.createdAt || new Date();
    this.updatedAt = user.updatedAt || new Date();
  }
}
