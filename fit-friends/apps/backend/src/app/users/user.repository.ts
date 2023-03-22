import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CRUDRepositoryInterface } from '@fit-friends/core';
import { User, UserRole } from '@fit-friends/shared-types';
import { UserEntity } from './user.entity';
import { CoachFeatures, UserFeatures } from 'libs/shared-types/src/lib/user-features.type';
import { UserQuery } from './query/user.query';
import { UserSort, UserQueryDefault as UQ, UserSortField} from './user.constant';

@Injectable()
export class UserRepository implements CRUDRepositoryInterface<UserEntity, number, User> {
  constructor(private readonly prisma: PrismaService) { }

  public async create(item: UserEntity): Promise<User> {
    const entityData = item.toObject();
    const features = entityData.features;
    delete entityData.features;

    if (entityData.role === UserRole.User) {
      return this.prisma.user.create({
        data: {
          ...entityData,
          userFeatures: {
            create: {
              ...features as UserFeatures
            }
          }
        },
        include: {
          userFeatures: true,
        }
      });
    }

    return this.prisma.user.create({
      data: {
        ...entityData,
        coachFeatures: {
          create: {
            ...features as CoachFeatures
          }
        }
      },
      include: {
        coachFeatures: true,
      }
    });
  }

  public async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: { email },
      include: {
        coachFeatures: true,
        userFeatures: true,
      }
    });
  }

  public async findById(id: number): Promise<User> {
    return await this.prisma.user.findFirst({
      where: { id },
      include: {
        coachFeatures: true,
        userFeatures: true,
      }
    });
  }

  public async find({
    limit = UQ.DEFAULT_USER_QUERY_LIMIT,
    page = 1,
    sortDirection = UQ.DEFAULT_USER_SORT_DIRECTION,
    sortType = UserSort.Date,
  }: UserQuery): Promise<User[]> {
    const sortField = { [UserSortField[sortType]]: sortDirection };

    return this.prisma.user.findMany({
      take: limit,
      include: {
        coachFeatures: true,
        userFeatures: true,
      },
      orderBy: [
        {
          ...sortField
        }
      ],
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
  }

  public async update(id: number, item: Partial<UserEntity>): Promise<User> {
    const features = (item.role === UserRole.User) ? {
      userFeatures: {
        update: {
          ...item.features
        }
      }
    } : {
      coachFeatures: {
        update: {
          ...item.features
        }
      }
    }

    delete item.features;

    return this.prisma.user.update({
      where: { id },
      data: {
        ...item,
        ...features,
      },
      include: {
        coachFeatures: true,
        userFeatures: true,
      }
    })
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    })
  }
}
