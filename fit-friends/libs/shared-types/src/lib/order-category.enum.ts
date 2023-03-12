export enum OrderCategory{
  SeasonPass ='SeasonPass',
  Training = 'Training',
}

export type OrderCategoryType = keyof typeof OrderCategory;
