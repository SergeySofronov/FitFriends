import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserExistsException, UserNotFoundEmailException, UserPasswordWrongException } from '@fit-friends/core';
import { RefreshTokenPayload, User } from '@fit-friends/shared-types';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { randomUUID } from 'crypto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly refreshTokenService: RefreshTokenService,
    private readonly logger: Logger,
  ) { }

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
      throw new UserNotFoundEmailException(this.logger, dto.email);
    }

    const userEntity = new UserEntity(existUser);
    if (! await userEntity.comparePassword(password)) {
      throw new UserPasswordWrongException(this.logger);
    }

    return existUser;
  }

  public async loginUser(user: Pick<User, 'id' | 'email' | 'name' | 'role'>,  refreshTokenId?: string) {
    const payload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    await this.refreshTokenService.deleteRefreshSession(refreshTokenId);

    const refreshTokenPayload: RefreshTokenPayload = {...payload, refreshTokenId: randomUUID()}

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
}
