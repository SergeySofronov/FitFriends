import { NotFoundException, Logger } from '@nestjs/common';


export class UserNotFoundEmailException extends NotFoundException {
  constructor(
    private readonly logger: Logger,
    email: string
  ) {
    const message = `User with the email — ${email} not found`;
    super(message);
    this.logger.error(message);
  }
}
