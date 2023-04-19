import { OrderCategoryType } from "@fit-friends/shared-types";

export class CreateUserBalanceDto {
  public category: OrderCategoryType;
  public gymId?: number;
  public trainingId?: number;
}
