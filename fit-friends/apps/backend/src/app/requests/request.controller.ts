import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles, RolesGuard, fillObject } from '@fit-friends/core';
import { RequestWithTokenPayload, TokenPayload, UserRole } from '@fit-friends/shared-types';
import { RequestService } from './request.service';
import { JwtAuthGuard } from '../users/guards/jwt-auth.guard';
import { RequestRdo } from './rdo/request.rdo';
import { CreateRequestDto } from './dto/create-request.dto';

@ApiTags('requests')
@Controller('requests')
export class RequestController {
  constructor(
    private readonly requestService: RequestService,
  ) { }

  @Post('/')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(`${UserRole.User}`)
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Resource for user registration', type: RequestRdo })
  public async create(@Req() { user }: RequestWithTokenPayload<TokenPayload>, @Body() dto: CreateRequestDto) {
    const newTraining = await this.requestService.createRequest(dto, user.sub);
    return fillObject(RequestRdo, newTraining);
  }
}
