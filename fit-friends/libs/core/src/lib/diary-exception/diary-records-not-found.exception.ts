import { NotFoundException, Logger } from '@nestjs/common';

export class DiaryRecordNotFoundException extends NotFoundException {
  constructor(
    private readonly logger: Logger,
  ) {
    const message = `User diary not found`;
    super(message);
    this.logger.error(message);
  }
}
