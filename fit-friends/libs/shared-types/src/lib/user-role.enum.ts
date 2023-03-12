export enum UserRole {
  Coach = 'Coach',
  User = 'User',
}

export type UserRoleType = keyof typeof UserRole;
