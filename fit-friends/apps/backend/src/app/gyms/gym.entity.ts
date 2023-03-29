import { Injectable } from '@nestjs/common'
import { Entity } from '@fit-friends/core';
import { Gym, GymFeatureType, Location } from '@fit-friends/shared-types';

@Injectable()
export class GymEntity implements Entity<GymEntity, Gym>, Gym {
  public id?: number;
  public title: string;
  public location: Location;
  public isVerified: boolean;
  public gymType: GymFeatureType;
  public photo: string[];
  public description: string;
  public price: number;
  public constructionDate: Date;

  constructor(gym: Gym) {
    this.fillEntity(gym);
  }

  public toObject() {
    return { ...this };
  }

  public fillEntity(gym: Gym) {
    this.id = gym.id;
    this.title = gym.title;
    this.location = gym.location;
    this.isVerified = gym.isVerified;
    this.gymType = gym.gymType;
    this.photo = gym.photo;
    this.description = gym.description;
    this.price = gym.price;
    this.constructionDate = gym.constructionDate;
  }
}
