import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CRUDRepositoryInterface } from '@fit-friends/core';
import { User, UserRole } from '@fit-friends/shared-types';
import { UserEntity } from './user.entity';
import { CoachFeatures, UserFeatures } from '@fit-friends/shared-types';
import { UserQuery } from './query/user.query';
import { UserSort, UserQuery as UQ, UserSortField } from './user.constant';

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
    limit = UQ.USER_QUERY_MAX,
    page = UQ.USER_DEFAULT_PAGE,
    sortDirection = UQ.USER_DEFAULT_SORT_DIRECTION,
    sortType = UserSort.Date,
  }: UserQuery, friendId?: number): Promise<User[]> {
    const sortField = { [UserSortField[sortType]]: sortDirection };

    return this.prisma.user.findMany({
      take: limit,
      where: {
        friends: {
          some: {
            id: friendId
          }
        }
      },
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

  public async addFriend(id: number, friendId: number): Promise<User> {
    const [user] = await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id },
        data: { friends: { connect: [{ id: friendId }] } },
      }),
      this.prisma.user.update({
        where: { id: friendId },
        data: { friends: { connect: [{ id }] } },
      })
    ]);

    return user;
  }

  public async removeFriend(id: number, friendId: number): Promise<User> {
    const [user] = await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id },
        data: { friends: { disconnect: [{ id: friendId }] } },
      }),
      this.prisma.user.update({
        where: { id: friendId },
        data: { friends: { disconnect: [{ id }] } },
      })
    ]);

    return user;
  }

  public async changeSubscription(id: number, coachId: number, isFollow: boolean): Promise<User> {
    const action = isFollow ? 'connect' : 'disconnect';
    const [user] = await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id },
        data: { subscriptions: { [action]: [{ id: coachId }] } },
      }),
      this.prisma.user.update({
        where: { id: coachId },
        data: { subscriptions: { [action]: [{ id }] } },
      })
    ]);

    return user;
  }

  public async findSubscribed(id: number): Promise<User[]> {
    return await this.prisma.user.findMany({
      where: { subscriptions: { some: { id } } },
    });
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    })
  }
}
