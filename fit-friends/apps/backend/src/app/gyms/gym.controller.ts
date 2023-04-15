import { Controller, Get, HttpCode, HttpStatus, Param, Query, Req, UseGuards } from '@nestjs/common';
import { Roles, RolesGuard, fillObject } from '@fit-friends/core';
import { RequestWithTokenPayload, TokenPayload, UserRole } from '@fit-friends/shared-types';
import { GymService } from './gym.service';
import { JwtAuthGuard } from '../users/guards/jwt-auth.guard';
import { ApiIndexQuery } from './query/gym.api-query.decorator';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GymQuery } from './query/gym.query';
import { GymRdo } from './rdo/gym.rdo';

@ApiTags('gyms')
@Controller('gyms')
export class GymController {
  constructor(
    private readonly gymService: GymService,
  ) { }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: "id", required: true, description: 'Gym unique identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Resource for getting information about certain gym', type: GymRdo })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Training not found', })
  async show(@Param('id') id: number) {
    const gym = await this.gymService.getGymById(id);
    return fillObject(GymRdo, gym);
  }

  @Get('/')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(`${UserRole.User}`)
  @ApiIndexQuery()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Resource for getting a list of gyms', type: [GymRdo], isArray: true })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Gyms not found', })
  async index(@Query() query: GymQuery) {
    const gyms = await this.gymService.getGyms(query);
    return fillObject(GymRdo, gyms);
  }

  @Get('/favorite')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(`${UserRole.User}`)
  @ApiIndexQuery()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Resource for getting a list of favorite gyms', type: [GymRdo], isArray: true })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Gyms not found', })
  async favorite(@Query() query: GymQuery, @Req() { user }: RequestWithTokenPayload<TokenPayload>) {
    const gyms = await this.gymService.getFavoriteGyms(query, user.sub);
    return fillObject(GymRdo, gyms);
  }
}

