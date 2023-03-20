import { BadRequestException, Logger } from '@nestjs/common';

export class UserRoleException extends BadRequestException {
  constructor(
    private readonly logger: Logger,
    userId: number,
  ) {
    const message = `User with the id — ${userId} has invalid role`;
    super(message);
    this.logger.error(message);
  }
}
