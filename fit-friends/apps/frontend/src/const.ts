export const AxiosDefaults = {
  BASE_URL: 'https://localhost:3333/fit-friends',
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
  Intro = '/intro',
  Register = '/register',
  Login = '/login',
  CreateTraining = '/create-training',
  Main = '/main',
  Account = '/account',
  Friends = '/friends',
  Notifications = '/notifications',
  UsersCatalog = '/users-catalog',

  // Available to all customers

  // Available to Users

  // Available to Coach
  //...

  TrainingCatalog = '/training-catalog',
  GymsCatalog = '/gyms-catalog',
  NotFound = '*',
}

export enum AuthorizationStatus {
  Auth = 'Auth',
  NoAuth = 'NoAuth',
  Unknown = 'Unknown',
}

export enum NameSpace {
  User = 'User',
}

export enum MainNavigationItem {
  Main = 'Main',
  Account = 'Account',
  Friends = 'Friends',
  Notifications = 'Notifications',
}

export const MainNavigationItemIcon = {
  [MainNavigationItem.Main]: '#icon-home',
  [MainNavigationItem.Account]: '#icon-user',
  [MainNavigationItem.Friends]: '#icon-friends',
  [MainNavigationItem.Notifications]: '#icon-notification',
} as const;

export const MainNavigationItemAria = {
  [MainNavigationItem.Main]: 'На главную',
  [MainNavigationItem.Account]: 'Личный кабинет',
  [MainNavigationItem.Friends]: 'Друзья',
  [MainNavigationItem.Notifications]: 'Уведомления',
} as const;

