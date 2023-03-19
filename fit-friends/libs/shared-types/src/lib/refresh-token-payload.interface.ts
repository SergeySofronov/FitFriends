import { TokenPayload } from "./token-payload.type";

export interface RefreshTokenPayload extends TokenPayload {
  refreshTokenId: string;
}
