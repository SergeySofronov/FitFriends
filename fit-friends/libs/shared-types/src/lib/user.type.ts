import { UserRoleType } from './user-role.enum';

export type User = {
  id?: number;
  email: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
  password: string;
  role?: UserRoleType;
}
