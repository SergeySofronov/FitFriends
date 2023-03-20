import { Body, Controller, HttpCode, HttpStatus, Patch, Post, Get, Res, Req, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject, JwtAuthGuard, JwtRefreshGuard, LocalAuthGuard } from '@fit-friends/core';
import { RefreshTokenPayload, RequestWithTokenPayload, RequestWithUser, TokenPayload } from '@fit-friends/shared-types';
import { UserService } from './user.service';
import { UserAuthMessages } from './user.constant';
import { UserRdo } from './rdo/user.rdo';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) { }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Resource for user registration', type: UserRdo })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: UserAuthMessages.ALREADY_EXISTS })
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.userService.register(dto);
    return fillObject(UserRdo, newUser);
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Get a new access/refresh tokens', type: TokenPayload })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: UserAuthMessages.INVALID_TOKEN })
  async refresh(@Req() request: RequestWithTokenPayload<RefreshTokenPayload>) {
    const { user: tokenPayload } = request;
    return this.userService.loginUser({
      name: tokenPayload.name,
      role: tokenPayload.role,
      email: tokenPayload.email,
      id: tokenPayload.sub
    }, tokenPayload.refreshTokenId);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiResponse({ status: HttpStatus.OK, description: UserAuthMessages.LOGIN, type: TokenPayload })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: `${UserAuthMessages.WRONG_PASSWORD} or ${UserAuthMessages.WRONG_LOGIN}` })
  public async login(@Req() req: RequestWithUser) {
    const { user } = req;
    return this.userService.loginUser(user);
  }


  @UseGuards(JwtAuthGuard)
  @Get('login')
  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.OK, description: UserAuthMessages.LOGIN, type: TokenPayload })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: UserAuthMessages.UNAUTHORIZED })
  public async checkAuth(@Res() res: Response) {
    return res.status(HttpStatus.OK).send({ message: UserAuthMessages.OK });
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/')
  @ApiResponse({ status: HttpStatus.OK, description: UserAuthMessages.UPDATE, type: UserRdo })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: UserAuthMessages.NOT_FOUND, type: UserRdo })
  public async update(@Req() { user }: RequestWithTokenPayload<RefreshTokenPayload>, @Body() dto: UpdateUserDto) {
    const updatedUser = await this.userService.updateUser(user.sub, dto);
    return fillObject(UserRdo, updatedUser);
  }
}
