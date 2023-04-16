import { BadRequestException, Logger } from '@nestjs/common';

export class RequestExistsException extends BadRequestException {
  constructor(
    private readonly logger: Logger,
  ) {
    const message = `Request already exists`;
    super(message);
    this.logger.error(message);
  }
}
