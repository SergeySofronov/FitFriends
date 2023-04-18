import { Injectable } from '@nestjs/common'
import { Entity } from '@fit-friends/core';
import { UserBalance } from '@fit-friends/shared-types';
import { UserBalanceValidity as BV } from './balance.constant';

@Injectable()
export class UserBalanceEntity implements Entity<UserBalanceEntity, UserBalance>, UserBalance {
  public id?: number;
  public gymId: number;
  public gymAvailable: number;
  public gymSpent: number;
  public trainingId: number;
  public trainingAvailable: number;
  public trainingSpent: number;
  public date: Date;

  constructor(balance: UserBalance) {
    this.fillEntity(balance);
  }

  public toObject() {
    return { ...this };
  }

  public fillEntity(balance: UserBalance) {
    this.id = balance.id;
    this.gymId = balance.gymId;
    this.gymAvailable = balance.gymAvailable || BV.DefaultQuantity;
    this.gymSpent = balance.gymSpent || BV.DefaultQuantity;
    this.trainingId = balance.trainingId;
    this.trainingAvailable = balance.trainingAvailable || BV.DefaultQuantity;
    this.trainingSpent = balance.trainingSpent || BV.DefaultQuantity;
    this.date = balance.date || new Date();
  }
}
