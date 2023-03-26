import { NotFoundException, Logger } from '@nestjs/common';

export class TrainingsNotFoundException extends NotFoundException {
  constructor(
    private readonly logger: Logger,
  ) {
    const message = `Trainings not found`;
    super(message);
    this.logger.error(message);
  }
}
