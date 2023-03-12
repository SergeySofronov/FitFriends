import { Body, Controller, HttpCode, HttpStatus, Post, Get, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject, JwtAuthGuard } from '@fit-friends/core';
import { UserService } from './user.service';
import { UserAuthMessages } from './user.constant';
import { UserRdo } from './rdo/user.rdo';
import { CreateUserDto } from './dto/create-user.dto';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { LoginUserDto } from './dto/login-user.dto';

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

  @Post('login')
  @ApiResponse({ status: HttpStatus.OK, description: UserAuthMessages.LOGIN, type: LoggedUserRdo })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: `${UserAuthMessages.WRONG_PASSWORD} or ${UserAuthMessages.WRONG_LOGIN}` })
  public async login(@Body() dto: LoginUserDto) {
    const verifiedUser = await this.userService.verifyUser(dto);
    console.log(verifiedUser)
    return this.userService.loginUser(verifiedUser);
  }

  @UseGuards(JwtAuthGuard)
  @Get('login')
  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.OK, description: UserAuthMessages.LOGIN, type: LoggedUserRdo })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: `${UserAuthMessages.WRONG_PASSWORD} or ${UserAuthMessages.WRONG_LOGIN}` })
  public async checkAuth(@Res() res: Response) {
    return res.status(HttpStatus.OK).send({ message: UserAuthMessages.OK });
  }
}
