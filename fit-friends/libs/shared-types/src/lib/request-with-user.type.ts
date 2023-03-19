import { User } from "@fit-friends/shared-types";

export type RequestWithUser = {
  user: Pick<User, 'id' | 'email' | 'name' | 'role'>;
}
