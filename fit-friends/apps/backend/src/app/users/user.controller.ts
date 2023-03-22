import {
  Body, Controller, HttpCode, HttpStatus, Patch, Param, Query,
  Post, Get, Res, Req, UploadedFile, UseGuards, UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject, getMulterOptions, JwtAuthGuard, JwtRefreshGuard, LocalAuthGuard, Roles, RolesGuard } from '@fit-friends/core';
import { RefreshTokenPayload, RequestWithTokenPayload, RequestWithUser, TokenPayload, UserRole } from '@fit-friends/shared-types';
import { UserService } from './user.service';
import { UserAuthMessages } from './user.constant';
import { UserRdo } from './rdo/user.rdo';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiIndexQuery } from './query/user.api-query.decorator';
import { UserQuery } from './query/user.query';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly configService: ConfigService,
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

  @UseGuards(JwtRefreshGuard)
  @Patch('/')
  @ApiResponse({ status: HttpStatus.OK, description: UserAuthMessages.UPDATE, type: UserRdo })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: UserAuthMessages.USER_NOT_FOUND, type: UserRdo })
  public async update(@Req() { user }: RequestWithTokenPayload<RefreshTokenPayload>, @Body() dto: UpdateUserDto) {
    const updatedUser = await this.userService.updateUser(user.sub, dto);
    return fillObject(UserRdo, updatedUser);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('avatar', getMulterOptions()))
  @Post('/:id/avatar')
  @ApiParam({ name: "id", required: true, description: "User unique identifier" })
  @ApiResponse({ status: HttpStatus.OK, description: 'Resource for setting user avatar', type: UserRdo })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: UserAuthMessages.USER_NOT_FOUND })
  public async upload(@Param('id') id: number, @UploadedFile() file: Express.Multer.File) {
    const updatedUser = this.userService.updateUserAvatar(id, file.filename);
    return fillObject(UserRdo, updatedUser);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/avatar')
  @ApiResponse({ status: HttpStatus.OK, description: 'Resource for getting user avatar', type: UserRdo })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: UserAuthMessages.USER_NOT_FOUND })
  public async read(@Req() { user }: RequestWithTokenPayload<RefreshTokenPayload>, @Res() res: Response) {
    const avatarPath = await this.userService.getUserAvatarPath(user.sub);
    return res.sendFile(avatarPath);
  }

  @Get('/')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(`${UserRole.User}`)
  @ApiIndexQuery()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Resource for getting a array of users', type: UserRdo })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Users not found', })
  async index(@Query() query: UserQuery) {
    const users = await this.userService.getUsers(query);
    return fillObject(UserRdo, users);
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: "id", required: true, description: "User unique identifier" })
  @ApiResponse({ status: HttpStatus.OK, description: 'Resource for getting detailed information about the user', type: UserRdo })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found', })
  async show(@Param('id') id: number) {
    const user = await this.userService.getUser(id);
    return fillObject(UserRdo, user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @ApiResponse({ status: HttpStatus.OK, description: UserAuthMessages.LOGOUT })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  async logout(@Req() { user }: RequestWithTokenPayload<RefreshTokenPayload>, @Res() res: Response) {
    await this.userService.logoutUser(user.sub);
    return res.status(HttpStatus.OK).send({ message: UserAuthMessages.UNAUTHORIZED })
  }
}
