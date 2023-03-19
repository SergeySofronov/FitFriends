import { UserRoleType } from "./user-role.enum";

export type TokenPayload = {
  sub: number;
  name: string;
  email: string;
  role: UserRoleType;
}
