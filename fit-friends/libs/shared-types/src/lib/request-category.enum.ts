export enum RequestCategory {
  Coworking = 'Coworking',
  Personal = 'Personal',
  Friendship = 'Friendship',
}

export type RequestCategoryType = keyof typeof RequestCategory;
