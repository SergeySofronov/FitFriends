export const SALT_ROUNDS = 10;

export const UserMessages = {
  ALREADY_EXISTS: 'User with this email already exists',
  UNAUTHORIZED: 'User is not authorized',
  INVALID_TOKEN: 'Token is invalid or not found',
  USER_NOT_FOUND: 'User not found',
  WRONG_PASSWORD: 'User password is wrong',
  WRONG_LOGIN: 'User login is wrong.',
  CREATE: 'Creates a new user.',
  LOGIN: "User's login procedure",
  LOGOUT: "User's logout procedure",
  UPDATE: "Updates the user's profile data",
  OK:'User authorized',
} as const;

export enum UserValidity {
  NameMinLength = 1,
  NameMaxLength = 15,
  PasswordMinLength = 6,
  PasswordMaxLength = 12,
  CertificateTitleMinLength = 5,
  CertificateTitleMaxLength = 100,
  CaloriesLossMinValue = 1000,
  CaloriesLossMaxValue = 5000,
  CaloriesLossPerDayMinValue = 1000,
  CaloriesLossPerDayMaxValue = 5000,
  MeritsMinLength = 10,
  MeritsMaxLength = 140,
}

export const UserQueryDefault = {
  DEFAULT_USER_QUERY_LIMIT: 50,
  DEFAULT_USER_SORT_DIRECTION: 'desc',
} as const;

export enum UserSort {
  Date = 'date',
}

export const UserSortField = {
  [UserSort.Date]: 'createdAt',
};

