import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CRUDRepositoryInterface } from '@fit-friends/core';
import { RequestSort, RequestQuery as RQ, RequestSortField } from './request.constant';
import { RequestEntity } from './request.entity';
import { UserRequest } from '@fit-friends/shared-types';
import { RequestQuery } from './query/request.query';

@Injectable()
export class RequestRepository implements CRUDRepositoryInterface<RequestEntity, number, UserRequest> {
  constructor(private readonly prisma: PrismaService) { }

  public async create(item: RequestEntity): Promise<UserRequest> {
    const entityData = item.toObject();

    return this.prisma.request.create({
      data: {
        ...entityData,
      }
    });
  }

  public async findById(id: number): Promise<UserRequest> {
    return await this.prisma.request.findFirst({
      where: { id },
    });
  }

  public async find({
    limit = RQ.REQUEST_QUERY_MAX,
    page = RQ.REQUEST_DEFAULT_PAGE,
    sortDirection = RQ.REQUEST_DEFAULT_SORT_DIRECTION,
    sortType = RequestSort.Date,
    category,
    status,
    requesterId,
  }: RequestQuery, options?: Record<string, unknown>): Promise<UserRequest[]> {
    const sortField = { [RequestSortField[sortType]]: sortDirection };

    return this.prisma.request.findMany({
      take: limit,
      where: {
        ...options ?? {},
        category: { in: category },
        status: { in: status },
        requesterId,
      },
      orderBy: [
        {
          ...sortField
        }
      ],
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
  }

  public async update(id: number, item: Partial<RequestEntity>): Promise<UserRequest> {
    return this.prisma.request.update({
      where: { id },
      data: {
        ...item,
      },
    })
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.request.delete({
      where: { id },
    })
  }
}
