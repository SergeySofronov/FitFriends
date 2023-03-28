import { OrderCategoryType } from "./order-category.enum";
import { PaymentType } from "./payment.enum";

export type Order = {
  id?: number;
  userId: number;
  category: OrderCategoryType;
  serviceId: number;
  price: number;
  quantity: number;
  total: number;
  paymentMethod: PaymentType;
  createdAt?: Date;
  updatedAt?: Date;
}

