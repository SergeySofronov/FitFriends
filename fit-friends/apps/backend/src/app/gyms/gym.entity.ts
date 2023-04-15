import { Injectable } from '@nestjs/common'
import { Entity } from '@fit-friends/core';
import { Gym, GymFeatureType, LocationType } from '@fit-friends/shared-types';

@Injectable()
export class GymEntity implements Entity<GymEntity, Gym>, Gym {
  public id?: number;
  public title: string;
  public location: LocationType;
  public isVerified: boolean;
  public gymFeature: GymFeatureType[];
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
    this.gymFeature = gym.gymFeature;
    this.photo = gym.photo;
    this.description = gym.description;
    this.price = gym.price;
    this.constructionDate = gym.constructionDate;
  }
}
