import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CRUDRepositoryInterface } from '@fit-friends/core';
import { TrainingDiary } from '@fit-friends/shared-types';
import { UserDiarySort, UserDiaryQuery as UQ, UserDiarySortField } from './user-diary.constant';
import { TrainingDiaryEntity } from './training-diary.entity';
import { UserDiaryQuery } from './query/user-diary.query';

@Injectable()
export class TrainingDiaryRepository implements CRUDRepositoryInterface<TrainingDiaryEntity, number, TrainingDiary> {
  constructor(private readonly prisma: PrismaService) { }

  public async create(item: TrainingDiaryEntity): Promise<TrainingDiary> {
    const entityData = item.toObject();
    return this.prisma.trainingDiary.create({
      data: {
        ...entityData,
      },
      include: { training: true },
    });
  }

  public async findById(id: number): Promise<TrainingDiary> {
    return await this.prisma.trainingDiary.findFirst({
      where: { id },
      include: { training: true },
    });
  }

  public async find({
    limit = UQ.USER_DIARY_QUERY_MAX,
    page = UQ.USER_DIARY_DEFAULT_PAGE,
    sortDirection = UQ.USER_DIARY_DEFAULT_SORT_DIRECTION,
    sortType = UserDiarySort.Date,
    fromDate,
    beforeDate,
  }: UserDiaryQuery, options?: Record<string, unknown>): Promise<TrainingDiary[]> {
    const sortField = { [UserDiarySortField[sortType]]: sortDirection };

    return this.prisma.trainingDiary.findMany({
      take: limit,
      where: {
        ...options ?? {},
        AND: [
          { date: { gte: fromDate } },
          { date: { lte: beforeDate } },
        ],
      },
      orderBy: [
        {
          ...sortField
        }
      ],
      skip: page > 0 ? limit * (page - 1) : undefined,
      include: { training: true },
    });
  }

  public async update(id: number, item: Partial<TrainingDiaryEntity>): Promise<TrainingDiary> {
    return this.prisma.trainingDiary.update({
      where: { id },
      data: {
        ...item,
      },
      include: { training: true },
    })
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.trainingDiary.delete({
      where: { id },
    })
  }
}
