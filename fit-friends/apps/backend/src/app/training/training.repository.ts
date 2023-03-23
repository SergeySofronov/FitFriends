import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CRUDRepositoryInterface } from '@fit-friends/core';
import { TrainingSort, TrainingQueryDefault as UQ, TrainingSortField } from './training.constant';
import { TrainingEntity } from './training.entity';
import { Training } from '@fit-friends/shared-types';
import { TrainingQuery } from './query/training.query';

@Injectable()
export class TrainingRepository implements CRUDRepositoryInterface<TrainingEntity, number, Training> {
  constructor(private readonly prisma: PrismaService) { }

  public async create(item: TrainingEntity): Promise<Training> {
    const entityData = item.toObject();
    return this.prisma.training.create({
      data: {
        ...entityData,
      }
    });
  }

  public async findById(id: number): Promise<Training> {
    return await this.prisma.training.findFirst({
      where: { id },
    });
  }

  public async find({
    limit = UQ.DEFAULT_TRAINING_QUERY_LIMIT,
    page = 1,
    sortDirection = UQ.DEFAULT_TRAINING_SORT_DIRECTION,
    sortType = TrainingSort.Date,
  }: TrainingQuery): Promise<Training[]> {
    const sortField = { [TrainingSortField[sortType]]: sortDirection };

    return this.prisma.training.findMany({
      take: limit,
      orderBy: [
        {
          ...sortField
        }
      ],
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
  }

  public async update(id: number, item: Partial<TrainingEntity>): Promise<Training> {
    return this.prisma.training.update({
      where: { id },
      data: {
        ...item,
      },
    })
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.training.delete({
      where: { id },
    })
  }
}
