import {UUID} from "../../../shared/domain/value_objects/UUID";
import {ValidInteger} from "../../../shared/domain/value_objects/ValidInteger";
import {ValidDate} from "../../../shared/domain/value_objects/ValidDate";
import {ValidBoolean} from "../../../shared/domain/value_objects/ValidBoolean";
import {ValidString} from "../../../shared/domain/value_objects/ValidString";
import {PaymentMethod} from "./payment_method";

export class Payment {
    constructor(
        readonly id: UUID,
        readonly creationDate: ValidDate,
        readonly approved: ValidBoolean,
        readonly deliveryName: ValidString,
        readonly paymentValue: ValidInteger,
        readonly paymentMethod: PaymentMethod) {}


}
