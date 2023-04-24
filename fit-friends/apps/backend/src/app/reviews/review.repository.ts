import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CRUDRepositoryInterface } from '@fit-friends/core';
import { ReviewSort, ReviewQuery as RQ, ReviewSortField } from './review.constant';
import { ReviewEntity } from './review.entity';
import { Review } from '@fit-friends/shared-types';
import { ReviewQuery } from './query/review.query';

@Injectable()
export class ReviewRepository implements CRUDRepositoryInterface<ReviewEntity, number, Review> {
  constructor(private readonly prisma: PrismaService) { }

  public async create(item: ReviewEntity): Promise<Review> {
    const entityData = item.toObject();
    return this.prisma.review.create({
      data: {
        ...entityData,
      },
      include: {
        user: true,
      }
    });
  }

  public async findById(id: number): Promise<Review> {
    return await this.prisma.review.findFirst({
      where: { id },
    });
  }

  public async find({
    limit = RQ.REVIEW_QUERY_MAX,
    page = RQ.REVIEW_DEFAULT_PAGE,
    sortDirection = RQ.REVIEW_DEFAULT_SORT_DIRECTION,
    sortType = ReviewSort.Date,
  }: ReviewQuery, options?: Record<string, unknown>): Promise<Review[]> {
    const sortField = { [ReviewSortField[sortType]]: sortDirection };

    return this.prisma.review.findMany({
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
      include: {
        user: true,
      }
    });
  }

  public async update(id: number, item: Partial<ReviewEntity>): Promise<Review> {
    return this.prisma.review.update({
      where: { id },
      data: {
        ...item,
      },
    })
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.review.delete({
      where: { id },
    })
  }
}
