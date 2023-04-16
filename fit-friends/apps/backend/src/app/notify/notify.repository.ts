import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CRUDRepositoryInterface } from '@fit-friends/core';
import { NotifySort, NotifyQuery as NQ, NotifySortField } from './notify.constant';
import { NotifyEntity } from './notify.entity';
import { Notification } from '@fit-friends/shared-types';
import { NotifyQuery } from './query/notify.query';

@Injectable()
export class NotifyRepository implements CRUDRepositoryInterface<NotifyEntity, number, Notification> {
  constructor(private readonly prisma: PrismaService) { }

  public async create(item: NotifyEntity): Promise<Notification> {
    const entityData = item.toObject();
    return this.prisma.notification.create({
      data: {
        ...entityData,
      }
    });
  }

  public async findById(id: number): Promise<Notification> {
    return await this.prisma.notification.findFirst({
      where: { id },
    });
  }

  public async find({
    limit = NQ.NOTIFY_QUERY_MAX,
    page = NQ.NOTIFY_DEFAULT_PAGE,
    sortDirection = NQ.NOTIFY_DEFAULT_SORT_DIRECTION,
    sortType = NotifySort.Date,
    isChecked
  }: NotifyQuery, options?: Record<string, unknown>): Promise<Notification[]> {
    const sortField = { [NotifySortField[sortType]]: sortDirection };

    return this.prisma.notification.findMany({
      take: limit,
      where: {
        ...options ?? {},
        isChecked,
      },
      orderBy: [
        {
          ...sortField
        }
      ],
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
  }

  public async update(id: number, item: Partial<NotifyEntity>): Promise<Notification> {
    return this.prisma.notification.update({
      where: { id },
      data: {
        ...item,
      },
    })
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.notification.delete({
      where: { id },
    })
  }
}
