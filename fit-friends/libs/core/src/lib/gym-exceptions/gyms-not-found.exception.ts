import { NotFoundException, Logger } from '@nestjs/common';

export class GymsNotFoundException extends NotFoundException {
  constructor(
    private readonly logger: Logger,
  ) {
    const message = `Gyms not found`;
    super(message);
    this.logger.error(message);
  }
}
