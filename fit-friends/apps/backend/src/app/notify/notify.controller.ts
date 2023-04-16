import { Controller, Delete, Get, HttpCode, HttpStatus, Param, Query, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { NotifyService } from './notify.service';
import { ApiParam, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../users/guards/jwt-auth.guard';
import { ApiIndexQuery } from './query/notify.api-query.decorator';
import { NotifyQuery } from './query/notify.query';
import { fillObject } from '@fit-friends/core';
import { NotifyRdo } from './rdo/notify.rdo';
import { RequestWithTokenPayload, TokenPayload } from '@fit-friends/shared-types';

@Controller('notify')
export class NotifyController {
  constructor(
    private readonly notifyService: NotifyService,
  ) { }

  @Get('/')
  @UseGuards(JwtAuthGuard)
  @ApiIndexQuery()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Resource for receiving notifications from an authorized user', type: NotifyRdo })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Notifications not found', })
  async index(@Query() query: NotifyQuery, @Req() { user }: RequestWithTokenPayload<TokenPayload>) {
    const users = await this.notifyService.getNotifications(query, user.sub);
    return fillObject(NotifyRdo, users);
  }


  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({ name: "id", required: true, description: 'Notification unique identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Resource for deleting a notification' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Notification not found', })
  async destroy(@Param('id') id: number, @Req() { user }: RequestWithTokenPayload<TokenPayload>, @Res() res: Response) {
    await this.notifyService.deleteNotification(id, user.sub);
    return res.status(HttpStatus.OK).send();
  }
}
