import { RequestCategoryType } from "./request-category.enum";
import { RequestStatusType } from "./request-status.enum";

export type UserRequest = {
  id?: number;
  category: RequestCategoryType,
  requesterId: number;
  requestedId: number;
  status: RequestStatusType;
  createdAt?: Date;
  updatedAt?: Date;
}
