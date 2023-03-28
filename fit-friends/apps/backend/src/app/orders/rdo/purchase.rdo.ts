import { OmitType } from "@nestjs/swagger";
import { OrderRdo } from "./order.rdo";

export class PurchaseRdo extends OmitType(OrderRdo, ['total', 'user']) {

}
