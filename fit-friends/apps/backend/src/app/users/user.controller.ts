import {
  Body, Controller, HttpCode, HttpStatus, Patch, Param, Query,
  Post, Get, Res, Req, UploadedFile, UseGuards, UseInterceptors, Delete,
} from '@nestjs/common';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject, Roles, RolesGuard } from '@fit-friends/core';
import { RefreshTokenPayload, RequestWithTokenPayload, RequestWithUser, TokenPayload, UserRole } from '@fit-friends/shared-types';
import { UserService } from './user.service';
import { UserMessages } from './user.constant';
import { UserRdo } from './rdo/user.rdo';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiIndexQuery } from './query/user.api-query.decorator';
import { UserQuery } from './query/user.query';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) { }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Resource for user registration', type: UserRdo })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: UserMessages.ALREADY_EXISTS })
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.userService.register(dto);
    return fillObject(UserRdo, newUser);
  }

  @Post('refresh')
  @UseGuards(JwtRefreshGuard)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Get a new access/refresh tokens', type: TokenPayload })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: UserMessages.INVALID_TOKEN })
  async refresh(@Req() request: RequestWithTokenPayload<RefreshTokenPayload>) {
    const { user: tokenPayload } = request;
    return this.userService.loginUser({
      name: tokenPayload.name,
      role: tokenPayload.role,
      email: tokenPayload.email,
      id: tokenPayload.sub
    }, tokenPayload.refreshTokenId);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiResponse({ status: HttpStatus.OK, description: UserMessages.LOGIN, type: TokenPayload })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: `${UserMessages.WRONG_PASSWORD} or ${UserMessages.WRONG_LOGIN}` })
  public async login(@Req() req: RequestWithUser) {
    const { user } = req;
    return this.userService.loginUser(user);
  }


  @Get('login')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: HttpStatus.OK, description: UserMessages.LOGIN, type: TokenPayload })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: UserMessages.UNAUTHORIZED })
  public async checkAuth(@Res() res: Response) {
    return res.status(HttpStatus.OK).send({ message: UserMessages.AUTHORIZED });
  }

  @Patch('/')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: HttpStatus.OK, description: UserMessages.UPDATE, type: UserRdo })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: UserMessages.USER_NOT_FOUND })
  public async update(@Req() { user }: RequestWithTokenPayload<TokenPayload>, @Body() dto: UpdateUserDto) {
    const updatedUser = await this.userService.updateUser(user.sub, dto);
    return fillObject(UserRdo, updatedUser);
  }

  @Post('/avatar')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiResponse({ status: HttpStatus.OK, description: 'Resource for setting user avatar', type: UserRdo })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: UserMessages.USER_NOT_FOUND })
  public async upload(@UploadedFile() file: Express.Multer.File, @Req() { user }: RequestWithTokenPayload<TokenPayload>) {
    const updatedUser = this.userService.updateUserAvatar(user.sub, file.filename);
    return fillObject(UserRdo, updatedUser);
  }

  @Get('/avatar')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: HttpStatus.OK, description: 'Resource for getting user avatar', type: UserRdo })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: UserMessages.USER_NOT_FOUND })
  public async read(@Req() { user }: RequestWithTokenPayload<TokenPayload>, @Res() res: Response) {
    const avatarPath = await this.userService.getUserAvatarPath(user.sub);
    return res.sendFile(avatarPath);
  }

  @Get('/')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(`${UserRole.User}`)
  @ApiIndexQuery()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Resource for getting an array of users', type: [UserRdo] })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: UserMessages.USER_NOT_FOUND, })
  async index(@Query() query: UserQuery) {
    const users = await this.userService.getUsers(query);
    return fillObject(UserRdo, users);
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: "id", required: true, description: "User unique identifier" })
  @ApiResponse({ status: HttpStatus.OK, description: 'Resource for getting detailed information about the user', type: UserRdo })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: UserMessages.USER_NOT_FOUND, })
  async show(@Param('id') id: number) {
    const user = await this.userService.getUserById(id);
    return fillObject(UserRdo, user);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: HttpStatus.OK, description: UserMessages.LOGOUT })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: UserMessages.USER_NOT_FOUND })
  async logout(@Req() { user }: RequestWithTokenPayload<TokenPayload>, @Res() res: Response) {
    await this.userService.logoutUser(user.sub);
    return res.status(HttpStatus.OK).send({ message: UserMessages.UNAUTHORIZED })
  }

  @Post('remove/:id')
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: "id", required: true, description: "User unique identifier" })
  @ApiResponse({ status: HttpStatus.OK, description: 'Resource to remove from friends' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: UserMessages.USER_NOT_FOUND })
  async remove(@Param('id') id: number, @Req() { user }: RequestWithTokenPayload<TokenPayload>, @Res() res: Response) {
    await this.userService.removeFriend(user.sub, id, user.name);
    return res.status(HttpStatus.OK).send();
  }

  @Get('user/friends')
  @UseGuards(JwtAuthGuard)
  @ApiIndexQuery()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Resource for getting an friend list', type: [UserRdo] })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: UserMessages.USER_NOT_FOUND, })
  async friends(@Query() query: UserQuery, @Req() { user }: RequestWithTokenPayload<TokenPayload>) {
    const users = await this.userService.getFriends(user.sub, query);
    return fillObject(UserRdo, users);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({ name: "id", required: true, description: "User unique identifier" })
  @ApiResponse({ status: HttpStatus.OK, description: 'Resource for deleting an user' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: UserMessages.USER_NOT_FOUND, })
  async destroy(@Req() { user }: RequestWithTokenPayload<TokenPayload>, @Res() res: Response) {
    await this.userService.deleteUser(user.sub);
    return res.status(HttpStatus.OK).send();
  }

}
