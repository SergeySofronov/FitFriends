export const AxiosDefaults = {
  BASE_URL: 'https://localhost:3333/guitar-shop',
  REQUEST_TIMEOUT: 5000,
} as const

export enum APIRoute {
  Users = '/users',
  Products = '/products',
  Comments = '/comments',
  Orders = '/orders',
  Register = '/register',
  Login = '/login',
  Photo = '/photo',
}

export enum AppRoute {
  // Available to all customers
  Root = '/',

  // Available to Users
  Main = 'main',
  // Available to Coach
  //...

  TrainingCatalog = '/training-catalog',
  UsersCatalog = '/users-catalog',
  GymsCatalog = '/gyms-catalog',
  Register = '/register',
  Login = '/login',
  NotFound = '*',
}

export enum AuthorizationStatus {
  Auth = 'Auth',
  NoAuth = 'NoAuth',
  Unknown = 'Unknown',
}

export enum HttpErrorCode {
  BadRequest = 400,
  UnAuthorized = 401,
  NotFound = 404,
  Forbidden = 403,
}

export enum NameSpace {
  User = 'User',
  Product = 'Product',
}

