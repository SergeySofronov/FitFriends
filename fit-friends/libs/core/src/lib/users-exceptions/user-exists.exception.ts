import { BadRequestException, Logger } from '@nestjs/common';

export class UserExistsException extends BadRequestException {
  constructor(
    private readonly logger: Logger,
    email: string,
  ) {
    const message = `User with email ${email} already exists`;
    super(message);
    this.logger.error(message);
  }
}
