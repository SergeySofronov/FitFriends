import { Logger, BadRequestException } from '@nestjs/common';

export class UserRoleChangeException extends BadRequestException {
  constructor(
    private readonly logger: Logger,
  ) {
    const message = 'Changing the user role is prohibited';
    super(message);
    this.logger.error(message);
  }
}
