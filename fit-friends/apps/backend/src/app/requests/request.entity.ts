import { Injectable } from '@nestjs/common'
import { Entity } from '@fit-friends/core';
import { UserRequest, RequestStatus, RequestStatusType, RequestCategoryType } from '@fit-friends/shared-types';

@Injectable()
export class RequestEntity implements Entity<RequestEntity, UserRequest>, UserRequest {
  public id?: number;
  public requesterId: number;
  public requestedId: number;
  public status: RequestStatusType;
  public createdAt?: Date;
  public updatedAt?: Date;
  public category: RequestCategoryType;

  constructor(req: UserRequest) {
    this.fillEntity(req);
  }

  public toObject() {
    return { ...this };
  }

  public fillEntity(req: UserRequest) {
    this.id = req.id;
    this.category = req.category;
    this.requesterId = req.requesterId;
    this.requestedId = req.requestedId;
    this.status = req.status || RequestStatus.Pending;
    this.createdAt = req.createdAt || new Date();
    this.updatedAt = req.updatedAt || new Date();
  }
}
