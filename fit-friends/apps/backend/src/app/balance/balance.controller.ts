import { Controller, Get, HttpCode, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles, RolesGuard, fillObject } from '@fit-friends/core';
import { UserRole } from '@fit-friends/shared-types';
import { UserBalanceService } from './balance.service';
import { ApiIndexQuery } from './query/balance.api-query.decorator';
import { JwtAuthGuard } from '../users/guards/jwt-auth.guard';
import { UserBalanceQuery } from './query/balance.query';

@ApiTags('balance')
@Controller('balance')
export class UserBalanceController {
  constructor(
    private readonly balanceService: UserBalanceService,
  ) { }

  @Get('/')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(`${UserRole.User}`)
  @ApiIndexQuery()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Resource for getting a balance of an authorized client', type: TrainingRdo })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Trainings not found', })
  async index(@Query() query: UserBalanceQuery) {
    const users = await this.balanceService.getUserBalance(query);
    return fillObject(TrainingRdo, users);
  }
}
