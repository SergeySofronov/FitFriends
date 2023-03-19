import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CRUDRepositoryInterface } from '@fit-friends/core';
import { User, UserRole } from '@fit-friends/shared-types';
import { UserEntity } from './user.entity';
import { CoachFeatures, UserFeatures } from 'libs/shared-types/src/lib/user-features.type';

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
    });
  }

  public async findById(id: number): Promise<User> {
    return this.prisma.user.findFirst({
      where: { id },
    });
  }

  public async update(id: number, item: Partial<UserEntity>): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: {
        ...item,
      }
    })
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    })
  }
}
