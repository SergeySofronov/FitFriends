import { Injectable } from '@nestjs/common'
import { Entity } from '@fit-friends/core';
import { Notification } from '@fit-friends/shared-types';

@Injectable()
export class NotifyEntity implements Entity<NotifyEntity, Notification>, Notification {
  public id?: number;
  public userId: number;
  public text: string;
  public isChecked: boolean;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(note: Notification) {
    this.fillEntity(note);
  }

  public toObject() {
    return { ...this };
  }

  public fillEntity(note: Notification) {
    this.id = note.id;
    this.userId = note.userId;
    this.text = note.text;
    this.isChecked = note.isChecked;
    this.createdAt = note.createdAt || new Date();
    this.updatedAt = note.updatedAt || new Date();
  }
}
