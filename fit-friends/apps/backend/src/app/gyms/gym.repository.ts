import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CRUDRepositoryInterface } from '@fit-friends/core';
import { GymSort, GymQuery as GQ, GymSortField } from './gym.constant';
import { GymEntity } from './gym.entity';
import { Gym } from '@fit-friends/shared-types';
import { GymQuery } from './query/gym.query';

@Injectable()
export class GymRepository implements CRUDRepositoryInterface<GymEntity, number, Gym> {
  constructor(private readonly prisma: PrismaService) { }

  public async create(item: GymEntity): Promise<Gym> {
    const entityData = item.toObject();
    return this.prisma.gym.create({
      data: {
        ...entityData,
      }
    });
  }

  public async findById(id: number): Promise<Gym> {
    return await this.prisma.gym.findFirst({
      where: { id },
    });
  }

  public async find({
    limit = GQ.GYM_QUERY_MAX,
    page = 1,
    sortDirection = GQ.GYM_DEFAULT_SORT_DIRECTION,
    sortType = GymSort.Date,
    priceMin,
    priceMax,
    gymFeature,
    isVerified,
    location,
  }: GymQuery, options?: Record<string, unknown>): Promise<Gym[]> {
    const sortField = { [GymSortField[sortType]]: sortDirection };

    return this.prisma.gym.findMany({
      take: limit,
      where: {
        ...options ?? {},
        isVerified,
        location: { in: location },
        gymFeature: {
          hasEvery: gymFeature || [],
        },
        AND: [
          { user: { every: { id: 1 } } },
          { price: { gte: priceMin } },
          { price: { lte: priceMax } },
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

  public async addFavoriteGym(gymId: number, userId: number): Promise<Gym> {
    return this.prisma.gym.update({
      where: { id: gymId },
      data: {
        user: {
          connect: {
            id: userId,
          }
        }
      }
    })
  }

  public async removeFavoriteGym(gymId: number, userId: number): Promise<Gym> {
    return this.prisma.gym.update({
      where: { id: gymId },
      data: {
        user: {
          disconnect: {
            id: userId,
          }
        }
      }
    })
  }

  public async toggleFavorite(gymId: number, userId: number, isFavorite: boolean): Promise<Gym> {
    return this.prisma.gym.update({
      where: { id: gymId },
      data: {
        user: { [isFavorite ? 'connect' : 'disconnect']: { id: userId } }
      }
    })
  }

  public async update(id: number, item: Partial<GymEntity>): Promise<Gym> {
    return this.prisma.gym.update({
      where: { id },
      data: {
        ...item,
      },
    })
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.gym.delete({
      where: { id },
    })
  }
}
