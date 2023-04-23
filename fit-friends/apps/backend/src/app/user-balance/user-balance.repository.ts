import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CRUDRepositoryInterface } from '@fit-friends/core';
import { UserBalanceSort, UserBalanceQuery as BQ, UserBalanceSortField } from './user-balance.constant';
import { UserBalanceEntity } from './user-balance.entity';
import { UserBalance } from '@fit-friends/shared-types';
import { UserBalanceQuery } from './query/user-balance.query';

@Injectable()
export class UserBalanceRepository implements CRUDRepositoryInterface<UserBalanceEntity, number, UserBalance> {
  constructor(private readonly prisma: PrismaService) { }

  public async create(item: UserBalanceEntity): Promise<UserBalance> {
    const entityData = item.toObject();
    return this.prisma.userBalance.create({
      data: {
        ...entityData,
      }
    });
  }

  public async findById(id: number): Promise<UserBalance> {
    return await this.prisma.userBalance.findFirst({
      where: { id },
    });
  }

  public async findByServiceId(userId: number, serviceId: Record<string, unknown>): Promise<UserBalance> {
    return await this.prisma.userBalance.findFirst({
      where: { ...serviceId || {}, userId },
    });
  }

  public async find({
    limit = BQ.USER_BALANCE_QUERY_MAX,
    page = 1,
    sortDirection = BQ.USER_BALANCE_DEFAULT_SORT_DIRECTION,
    sortType = UserBalanceSort.Date,
  }: UserBalanceQuery, options?: Record<string, unknown>): Promise<UserBalance[]> {
    const sortField = { [UserBalanceSortField[sortType]]: sortDirection };

    return this.prisma.userBalance.findMany({
      take: limit,
      where: {
        ...options ?? {},
      },
      orderBy: [
        {
          ...sortField
        }
      ],
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
  }

  public async update(id: number, item: Partial<UserBalanceEntity>, options?: Record<string, unknown>): Promise<UserBalance> {
    return this.prisma.userBalance.update({
      where: { id },
      data: {
        ...item,
        ...options || {},
      },
    })
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.userBalance.delete({
      where: { id },
    })
  }
}
