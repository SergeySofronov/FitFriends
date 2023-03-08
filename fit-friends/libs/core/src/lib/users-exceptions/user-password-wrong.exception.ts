import { BadRequestException, Logger } from '@nestjs/common';

export class UserPasswordWrongException extends BadRequestException {
  constructor(private readonly logger: Logger,) {
    const message = `User password is wrong`;
    super(message);
    this.logger.error(message);
  }
}
