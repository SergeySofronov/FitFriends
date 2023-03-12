export const SALT_ROUNDS = 10;

export const UserAuthMessages = {
  ALREADY_EXISTS: 'User with this email already exists',
  NOT_FOUND: 'User not found',
  WRONG_PASSWORD: 'User password is wrong',
  WRONG_LOGIN: 'User login is wrong.',
  CREATE: 'Creates a new user.',
  LOGIN: "User's login procedure",
  OK:'User authorized',
} as const;

export enum UserValidity {
  NameMinLength = 1,
  NameMaxLength = 15,
  PasswordMinLength = 6,
  PasswordMaxLength = 12,
  caloriesLossMinValue = 1000,
  caloriesLossMaxValue = 5000,
  caloriesLossPerDayMinValue = 1000,
  caloriesLossPerDayMaxValue = 5000,
}
