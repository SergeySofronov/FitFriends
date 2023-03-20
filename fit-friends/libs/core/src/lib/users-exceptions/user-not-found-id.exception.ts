import { Logger, NotFoundException } from '@nestjs/common';

export class UserNotFoundIdException extends NotFoundException {
  constructor(
    private readonly logger: Logger,
    userId: number
  ) {
    super(`User with the id — ${userId} not found`);
  }
}
