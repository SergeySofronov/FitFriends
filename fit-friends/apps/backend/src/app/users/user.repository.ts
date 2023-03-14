import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CRUDRepositoryInterface } from '@fit-friends/core';
import { User } from '@fit-friends/shared-types';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository implements CRUDRepositoryInterface<UserEntity, number, User> {
  constructor(private readonly prisma: PrismaService) { }

  public async create(item: UserEntity): Promise<User> {
    const entityData = item.toObject();
    return this.prisma.user.create({
      data: {
        ...entityData,
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
