import { BadRequestException, createParamDecorator, ExecutionContext } from '@nestjs/common';

export const BooleanParamDecorator = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const booleanParameter = ctx.switchToHttp().getRequest().params[data];

    if ((booleanParameter === 'true') || (booleanParameter === '1')) {
      return true;
    }

    if ((booleanParameter === 'false') || (booleanParameter === '0')) {
      return false;
    }

    throw new BadRequestException(`Parameter ${data} must be boolean type or number (1 or 0)`);
  },
);
