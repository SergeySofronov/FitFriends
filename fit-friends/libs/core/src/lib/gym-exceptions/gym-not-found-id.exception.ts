import { Logger, NotFoundException } from '@nestjs/common';

export class GymNotFoundIdException extends NotFoundException {
  constructor(
    private readonly logger: Logger,
    id: number
  ) {
    super(`Gym with the id — ${id} not found`);
  }
}
