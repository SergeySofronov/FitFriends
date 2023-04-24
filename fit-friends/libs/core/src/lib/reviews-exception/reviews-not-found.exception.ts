import { NotFoundException, Logger } from '@nestjs/common';

export class ReviewsNotFoundException extends NotFoundException {
  constructor(
    private readonly logger: Logger,
    id: number
  ) {
    const message = `Reviews not found for training with id - ${id}`;
    super(message);
    this.logger.error(message);
  }
}
