export enum UserRole {
  Admin = 'Admin',
  User = 'User',
}

export type UserRoleType = keyof typeof UserRole;
