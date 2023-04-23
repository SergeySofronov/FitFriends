import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CRUDRepositoryInterface } from '@fit-friends/core';
import { UserDiarySort, UserDiaryQuery as UQ, UserDiarySortField } from './user-diary.constant';
import { FoodDiary } from '@fit-friends/shared-types';
import { FoodDiaryEntity } from './food-diary.entity';
import { UserDiaryQuery } from './query/user-diary.query';

@Injectable()
export class FoodDiaryRepository implements CRUDRepositoryInterface<FoodDiaryEntity, number, FoodDiary> {
  constructor(private readonly prisma: PrismaService) { }

  public async create(item: FoodDiaryEntity): Promise<FoodDiary> {
    const entityData = item.toObject();
    return this.prisma.foodDiary.create({
      data: {
        ...entityData,
      }
    });
  }

  public async findById(id: number): Promise<FoodDiary> {
    return await this.prisma.foodDiary.findFirst({
      where: { id },
    });
  }

  public async find({
    limit = UQ.USER_DIARY_QUERY_MAX,
    page = UQ.USER_DIARY_DEFAULT_PAGE,
    sortDirection = UQ.USER_DIARY_DEFAULT_SORT_DIRECTION,
    sortType = UserDiarySort.Date,
    fromDate,
    beforeDate,
  }: UserDiaryQuery, options?: Record<string, unknown>): Promise<FoodDiary[]> {
    const sortField = { [UserDiarySortField[sortType]]: sortDirection };

    return this.prisma.foodDiary.findMany({
      take: limit,
      where: {
        ...options ?? {},
        AND: [
          { createdAt: { gte: fromDate } },
          { createdAt: { lte: beforeDate } },
        ],
      },
      orderBy: [
        {
          ...sortField
        }
      ],
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
  }

  public async update(id: number, item: Partial<FoodDiaryEntity>): Promise<FoodDiary> {
    return this.prisma.foodDiary.update({
      where: { id },
      data: {
        ...item,
      },
    })
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.foodDiary.delete({
      where: { id },
    })
  }
}
