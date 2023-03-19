import { Body, Controller, HttpCode, HttpStatus, Patch, Post, Get, Res, Req, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject, JwtAuthGuard, JwtRefreshGuard, LocalAuthGuard } from '@fit-friends/core';
import { RefreshTokenPayload, RequestWithTokenPayload, RequestWithUser } from '@fit-friends/shared-types';
import { UserService } from './user.service';
import { UserAuthMessages } from './user.constant';
import { UserRdo } from './rdo/user.rdo';
import { CreateUserDto } from './dto/create-user.dto';
import { LoggedUserRdo } from './rdo/logged-user.rdo';

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
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get a new access/refresh tokens'
  })
  async refresh(@Req() request: RequestWithTokenPayload<RefreshTokenPayload>) {
    const { user: tokenPayload } = request;
    return this.userService.loginUser(tokenPayload);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiResponse({ status: HttpStatus.OK, description: UserAuthMessages.LOGIN, type: LoggedUserRdo })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: `${UserAuthMessages.WRONG_PASSWORD} or ${UserAuthMessages.WRONG_LOGIN}` })
  public async login(@Req() req: RequestWithUser) {
    const { user } = req;
    return this.userService.loginUser(user);
  }


  @UseGuards(JwtAuthGuard)
  @Get('login')
  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.OK, description: UserAuthMessages.LOGIN, type: LoggedUserRdo })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: `${UserAuthMessages.WRONG_PASSWORD} or ${UserAuthMessages.WRONG_LOGIN}` })
  public async checkAuth(@Res() res: Response) {
    return res.status(HttpStatus.OK).send({ message: UserAuthMessages.OK });
  }

  // @UseGuards(JwtAuthGuard)
  // @Patch('/')
  // @ApiResponse({status: HttpStatus.OK, description: UserAuthMessages.UPDATE, type: UserRdo})
  // @ApiResponse({
  //   type: UserRdo,
  //   status: HttpStatus.NOT_FOUND,
  //   description: UserAuthMessages.NOT_FOUND,
  // })
  // public async update(@Req() req: Request, @Body() dto: UpdateUserDto) {
  //   const updatedUser = await this.userService.updateUser(req.user['sub'], dto);
  //   return fillObject(UserRdo, updatedUser);
  // }
}
