import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserExistsException, UserFriendIdException, UserNotFoundEmailException, UserNotFoundIdException, UserPasswordWrongException, UserRoleChangeException, UsersNotFoundException } from '@fit-friends/core';
import { RefreshTokenPayload, User } from '@fit-friends/shared-types';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { randomUUID } from 'crypto';
import { UpdateUserDto } from './dto/update-user.dto';
import { resolve } from 'path'
import { existsSync, unlinkSync } from 'fs';
import { UserQuery } from './query/user.query';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly refreshTokenService: RefreshTokenService,
    private readonly logger: Logger,
  ) { }

  private async checkUserIdMatch(userId: number, friendId: number) {
    const user = await this.getUserById(userId);
    const friend = await this.getUserById(friendId);
    if (user.id === friend.id) {
      throw new UserFriendIdException(this.logger);
    }
  }

  public async getUserById(id: number) {
    const existUser = await this.userRepository.findById(id);
    if (!existUser) {
      throw new UserNotFoundIdException(this.logger, id);
    }

    return existUser;
  }

  public async register(dto: CreateUserDto) {
    const { email, password } = dto;
    const existUser = await this.userRepository.findByEmail(email);
    if (existUser) {
      throw new UserExistsException(this.logger, email);
    }
    const userEntity = await new UserEntity({ ...dto, avatar: this.configService.get<string>('file.defaultAvatar') }).setPassword(password);

    return this.userRepository.create(userEntity);
  }

  public async verifyUser(dto: LoginUserDto) {
    const { email, password } = dto;
   const existUser = await this.userRepository.findByEmail(email);
    if (!existUser) {
      throw new UserNotFoundEmailException(this.logger, email);
    }
    const userEntity = new UserEntity(existUser);
    if (! await userEntity.comparePassword(password)) {
      throw new UserPasswordWrongException(this.logger);
    }

    return existUser;
  }

  public async loginUser(user: Pick<User, 'id' | 'email' | 'name' | 'role'>, refreshTokenId?: string) {
    const payload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    await this.refreshTokenService.deleteRefreshSession(refreshTokenId);

    const refreshTokenPayload: RefreshTokenPayload = { ...payload, refreshTokenId: randomUUID() }

    await this.refreshTokenService.createRefreshSession(refreshTokenPayload);

    return {
      email: user.email,
      access_token: await this.jwtService.signAsync(payload),
      refresh_token: await this.jwtService.signAsync(refreshTokenPayload, {
        secret: this.configService.get<string>('jwt.refreshTokenSecret'),
        expiresIn: this.configService.get<string>('jwt.refreshTokenExpiresIn')
      })
    };
  }

  public async updateUser(id: number, dto: UpdateUserDto): Promise<User> {
    const existUser = await this.getUserById(id);

    if (existUser.role !== dto.role) {
      throw new UserRoleChangeException(this.logger);
    }

    return this.userRepository.update(id, { ...dto, updatedAt: new Date() });
  }

  public async updateUserAvatar(id: number, avatar: string): Promise<User> {
    const existUser = await this.getUserById(id);

    const userAvatar = existUser?.avatar;

    console.log(userAvatar)

    if (userAvatar && avatar) {
      const avatarPath = resolve(
        __dirname,
        this.configService.get<string>('file.dest'),
        existUser.id.toString(),
        userAvatar
      );
      if (existsSync(avatarPath)) {
        unlinkSync(avatarPath);
      }
    }

    delete existUser["coachFeatures"];
    delete existUser["userFeatures"];

    return this.userRepository.update(id, { ...existUser, avatar, updatedAt: new Date() });
  }

  public async getUserAvatarPath(id: number): Promise<string> {
    const existUser = await this.getUserById(id);
    const defaultAvatar = this.configService.get<string>('file.defaultAvatar');

    console.log(defaultAvatar)
    console.log(existUser.avatar)

    if (existUser.avatar === defaultAvatar) {
      return resolve(__dirname, this.configService.get<string>('file.defaultResourceFolder'), this.configService.get<string>('file.defaultAvatarFolder'), existUser.avatar);
    }

    return resolve(__dirname, `${this.configService.get<string>('file.dest')}/${existUser.id.toString()}/${existUser.avatar}`);
  }

  async getUsers(query: UserQuery): Promise<User[]> {
    const existUsers = await this.userRepository.find(query);

    if (!existUsers?.length) {
      throw new UsersNotFoundException(this.logger);
    }
    return existUsers;
  }

  async logoutUser(id: number): Promise<void> {
    await this.getUserById(id);
    await this.refreshTokenService.deleteRefreshTokens(id);
  }

  async addFriend(userId: number, friendId: number): Promise<User> {
    await this.checkUserIdMatch(userId, friendId);
    return this.userRepository.addFriend(userId, friendId);
  }

  async removeFriend(userId: number, friendId: number): Promise<User> {
    await this.checkUserIdMatch(userId, friendId);
    return this.userRepository.removeFriend(userId, friendId);
  }

  async getFriends(userId: number, query: UserQuery): Promise<User[]> {
    return this.userRepository.find(query, userId);
  }

  public async deleteUser(userId: number) {
    return this.userRepository.destroy(userId);
  }
}
