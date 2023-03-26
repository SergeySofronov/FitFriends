import { Logger, NotFoundException } from '@nestjs/common';

export class TrainingNotFoundIdException extends NotFoundException {
  constructor(
    private readonly logger: Logger,
    id: number
  ) {
    super(`Training with the id — ${id} not found`);
  }
}
