import { NotFoundException, Logger } from '@nestjs/common';

export class UserNotAdminException extends NotFoundException {
  constructor(
    private readonly logger: Logger,
    userId: string
  ) {
    const message = `User with the id — ${userId} is not admin`;
    super(message);
    this.logger.error(message);
  }
}
