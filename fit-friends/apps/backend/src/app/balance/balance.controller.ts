import { Controller, Get, HttpCode, HttpStatus, Query, Req, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles, RolesGuard, fillObject } from '@fit-friends/core';
import { RequestWithTokenPayload, TokenPayload, UserRole } from '@fit-friends/shared-types';
import { UserBalanceService } from './balance.service';
import { ApiIndexQuery } from './query/balance.api-query.decorator';
import { JwtAuthGuard } from '../users/guards/jwt-auth.guard';
import { UserBalanceQuery } from './query/balance.query';
import { UserBalanceRdo } from './rdo/balance.rdo';

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
  @ApiResponse({ status: HttpStatus.OK, description: 'Resource for getting a balance of an authorized client', type: [UserBalanceRdo] })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Balance not found', })
  async index(@Query() query: UserBalanceQuery, @Req() { user }: RequestWithTokenPayload<TokenPayload>) {
    const users = await this.balanceService.getUserBalance(query, user.sub);
    return fillObject(UserBalanceRdo, users);
  }

  @Patch('/:id')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(`${UserRole.Coach}`)
  @ApiParam({ name: "id", required: true, description: 'Training unique identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Resource for editing training information', type: TrainingRdo })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Training not found' })
  public async decrease(@Param('id') id: number, @Req() { user }: RequestWithTokenPayload<TokenPayload>, @Body() dto: UpdateTrainingDto) {
    const updatedTraining = await this.balanceService.updateUserBalance(id, { ...dto, coachId: user.sub });
    return fillObject(TrainingRdo, updatedTraining);
  }
}
