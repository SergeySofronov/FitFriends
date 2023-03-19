import { Entity } from "@fit-friends/core";
import { Token } from "@fit-friends/shared-types";

export class RefreshTokenEntity implements Entity<RefreshTokenEntity, Token>, Token {
  public id: number;
  public tokenId: string;
  public userId: number;
  public createdAt: Date;
  public expiresIn: Date;

  constructor(refreshToken: Token) {
    this.createdAt = new Date();
    this.fillEntity(refreshToken);
  }

  public toObject(): RefreshTokenEntity {
    return { ...this }
  }

  public fillEntity(entity: Token): void {
    this.userId = entity.userId;
    this.id = entity.id;
    this.tokenId = entity.tokenId;
    this.createdAt = entity.createdAt;
    this.expiresIn = entity.expiresIn;
  }
}
