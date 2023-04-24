import { Logger, Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewsController } from './review.controller';
import { ReviewRepository } from './review.repository';
import { TrainingModule } from '../training/training.module';

@Module({
  imports: [TrainingModule],
  providers: [
    ReviewService,
    ReviewRepository,
    Logger
  ],
  controllers: [ReviewsController],
})
export class ReviewsModule { }
