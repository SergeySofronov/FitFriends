import { Injectable } from '@nestjs/common'
import { Entity } from '@fit-friends/core';
import { Review } from '@fit-friends/shared-types';

@Injectable()
export class ReviewEntity implements Entity<ReviewEntity, Review>, Review {
  public id?: number;
  public trainingId: number;
  public userId: number;
  public rating: number;
  public content: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(review: Review) {
    this.fillEntity(review);
  }

  public toObject() {
    return { ...this };
  }

  public fillEntity(review: Review) {
    this.id = review.id;
    this.trainingId = review.trainingId;
    this.userId = review.userId;
    this.rating = review.rating;
    this.content = review.content
    this.createdAt = review.createdAt || new Date();
    this.updatedAt = review.updatedAt || new Date();
  }
}
