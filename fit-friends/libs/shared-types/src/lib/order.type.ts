import { OrderCategory } from "./order-category.enum";
import { Payment } from "./payment.enum";

export type Order = {
  id?: number;
  userId: number;
  category: OrderCategory;
  serviceId?: number;
  price: number;
  quantity: number;
  total: number;
  paymentMethod: Payment;
  createdAt?: Date;
  updatedAt?: Date;
}

