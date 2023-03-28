import { PartialType, PickType } from "@nestjs/swagger";
import { CreateOrderDto } from "./create-order.dto";

export class UpdateOrderDto extends PartialType(PickType(CreateOrderDto, ['quantity', 'paymentMethod'])) {

}
