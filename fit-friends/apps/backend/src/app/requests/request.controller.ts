import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles, RolesGuard, fillObject } from '@fit-friends/core';
import { RequestWithTokenPayload, TokenPayload, UserRole } from '@fit-friends/shared-types';
import { RequestService } from './request.service';
import { JwtAuthGuard } from '../users/guards/jwt-auth.guard';
import { RequestRdo } from './rdo/request.rdo';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { RequestQuery } from './query/request.query';
import { ApiIndexQuery } from './query/request.api-query.decorator';

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
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Resource for creating a request', type: RequestRdo })
  public async create(@Req() { user }: RequestWithTokenPayload<TokenPayload>, @Body() dto: CreateRequestDto) {
    const newRequest = await this.requestService.createRequest(dto, user.sub);
    return fillObject(RequestRdo, newRequest);
  }

  @Post('/:id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: HttpStatus.OK, description: 'Resource for editing request status', type: RequestRdo })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Request not found' })
  public async update(@Param('id') id: number, @Req() { user }: RequestWithTokenPayload<TokenPayload>, @Body() dto: UpdateRequestDto) {
    const request = await this.requestService.updateRequest(dto, id, user.sub);
    return fillObject(RequestRdo, request);
  }

  @Get('/')
  @UseGuards(JwtAuthGuard)
  @ApiIndexQuery()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Resource for getting a list of requests of an requested client', type: [RequestRdo] })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Requests not found', })
  async index(@Query() query: RequestQuery, @Req() { user }: RequestWithTokenPayload<TokenPayload>) {
    const requests = await this.requestService.getRequests(query, user.sub);
    return fillObject(RequestRdo, requests);
  }
}
