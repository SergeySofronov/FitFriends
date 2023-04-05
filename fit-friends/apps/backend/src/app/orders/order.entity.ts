import { Injectable } from '@nestjs/common'
import { Entity } from '@fit-friends/core';
import { Order, OrderCategoryType, PaymentType } from '@fit-friends/shared-types';

@Injectable()
export class OrderEntity implements Entity<OrderEntity, Order>, Order {
  public id?: number;
  public userId: number;
  public category: OrderCategoryType;
  public gymId: number;
  public trainingId: number;
  public price: number;
  public quantity: number;
  public total: number;
  public paymentMethod: PaymentType;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(order: Order) {
    this.fillEntity(order);
  }


  public toObject() {
    return { ...this };
  }

  public fillEntity(order: Order) {
    this.id = order.id;
    this.userId = order.userId;
    this.category = order.category;
    this.gymId = order.gymId;
    this.trainingId = order.trainingId;
    this.price = order.price;
    this.quantity = order.quantity;
    this.total = this.price * this.quantity;
    this.paymentMethod = order.paymentMethod;
    this.createdAt = order.createdAt || new Date();
    this.updatedAt = order.updatedAt || new Date();
  }
}
