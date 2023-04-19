import { OrderCategoryType } from "./order-category.enum";

export type UserBalance = {
  id?: number;
  userId: number;
  category:OrderCategoryType;
  gymId?: number;
  trainingId?: number;
  available?: number;
  spent?: number;
  updatedAt?: Date;
}
