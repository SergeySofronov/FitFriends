import { Logger, NotFoundException } from '@nestjs/common';

export class UserBalanceZeroException extends NotFoundException {
  constructor(
    private readonly logger: Logger,
  ) {
    super(`The resource is not available because the balance is zero`);
  }
}
