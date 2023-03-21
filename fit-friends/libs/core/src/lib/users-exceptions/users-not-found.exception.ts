import { NotFoundException, Logger } from '@nestjs/common';

export class UsersNotFoundException extends NotFoundException {
  constructor(
    private readonly logger: Logger,
  ) {
    const message = `Users not found`;
    super(message);
    this.logger.error(message);
  }
}
