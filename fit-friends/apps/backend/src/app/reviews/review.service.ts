import { Injectable, Logger } from '@nestjs/common';
import { ReviewRepository } from './review.repository';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from '@fit-friends/shared-types';
import { TrainingService } from '../training/training.service';
import { ReviewEntity } from './review.entity';
import { ReviewQuery } from './query/review.query';
import { ReviewsNotFoundException } from '@fit-friends/core';

@Injectable()
export class ReviewService {
  constructor(
    private readonly trainingService: TrainingService,
    private readonly reviewRepository: ReviewRepository,
    private readonly logger: Logger,
  ) { }


  public async createReview(dto: CreateReviewDto, trainingId: number, userId: number): Promise<Review> {
    const training = await this.trainingService.getTrainingById(trainingId);
    let { rating, reviewsCount } = training;
    rating = (rating * reviewsCount + dto.rating) / (reviewsCount + 1);
    reviewsCount += 1;
    await this.trainingService.updateTraining(trainingId, { rating, reviewsCount, coachId: training.coachId });
    const newReview = new ReviewEntity({ ...dto, trainingId, userId });
    return this.reviewRepository.create(newReview);
  }

  async getReviews(query: ReviewQuery, trainingId: number): Promise<Review[]> {
    const existReview = await this.reviewRepository.find(query, { trainingId });
    if (!existReview?.length) {
      throw new ReviewsNotFoundException(this.logger, trainingId);
    }

    return existReview;
  }
}
