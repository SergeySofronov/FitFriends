import { BadRequestException, Logger } from '@nestjs/common';

export class UserFriendIdException extends BadRequestException {
  constructor(
    private readonly logger: Logger,
  ) {
    const message = `User IDs match`;
    super(message);
    this.logger.error(message);
  }
}
