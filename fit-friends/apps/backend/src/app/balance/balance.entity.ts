import { Injectable } from '@nestjs/common'
import { Entity } from '@fit-friends/core';
import { OrderCategoryType, UserBalance } from '@fit-friends/shared-types';
import { UserBalanceValidity as BV } from './balance.constant';

@Injectable()
export class UserBalanceEntity implements Entity<UserBalanceEntity, UserBalance>, UserBalance {
  public id?: number;
  public userId: number;
  public category: OrderCategoryType;
  public gymId: number;
  public trainingId: number;
  public available: number;
  public spent: number;
  public updatedAt: Date;

  constructor(balance: UserBalance) {
    this.fillEntity(balance);
  }

  public toObject() {
    return { ...this };
  }

  public fillEntity(balance: UserBalance) {
    this.id = balance.id;
    this.userId = balance.userId;
    this.category = balance.category;
    this.gymId = balance.gymId;
    this.trainingId = balance.trainingId;
    this.available = balance.available || BV.DefaultQuantity;
    this.spent = balance.spent || BV.DefaultQuantity;
    this.updatedAt = new Date();
  }
}
