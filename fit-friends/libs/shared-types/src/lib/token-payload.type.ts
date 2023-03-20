import { UserRoleType } from "./user-role.enum";

export class TokenPayload {
  sub: number;
  name: string;
  email: string;
  role: UserRoleType;
}
