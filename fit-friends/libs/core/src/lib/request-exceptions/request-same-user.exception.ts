import { BadRequestException, Logger } from '@nestjs/common';

export class RequestSameUserException extends BadRequestException {
  constructor(
    private readonly logger: Logger,
  ) {
    const message = `You cannot create a request to yourself`;
    super(message);
    this.logger.error(message);
  }
}
