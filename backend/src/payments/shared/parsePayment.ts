import {BaseException} from "~features/shared/domain/exceptions/BaseException";
import {UUID} from "~features/shared/domain/value_objects/UUID";
import {ValidDate} from "~features/shared/domain/value_objects/ValidDate";
import {ValidBoolean} from "~features/shared/domain/value_objects/ValidBoolean";
import {ValidString} from "~features/shared/domain/value_objects/ValidString";
import {ValidInteger} from "~features/shared/domain/value_objects/ValidInteger";
import {PaymentMethod} from "~features/payments/domain/models/payment_method";
import {PaymentDto} from "./payment_dto";
import {wrapType} from "~features/shared/utils/WrapType";
import {InvalidUUIDException} from "~features/shared/domain/exceptions/InvalidUUIDException";



export function parsePayment(dto: PaymentDto): {
    errors: BaseException[],
    data: {
        id: UUID,
        creationDate: ValidDate,
        approved: ValidBoolean,
        deliveryName: ValidString,
        paymentValue: ValidInteger,
        paymentMethod: PaymentMethod
    }
}
{
    const errors: BaseException[] = [];
    const id = wrapType<UUID,InvalidUUIDException>(
        () => UUID.from(dto.id))
    if (id instanceof InvalidUUIDException) {
        errors.push(id);
    }
    const creationDate = wrapType<ValidDate,BaseException>(
        () => ValidDate.from(dto.creationDate))
    if (creationDate instanceof BaseException) {
        errors.push(creationDate);
    }
    const approved = wrapType<ValidBoolean,BaseException>(
        () => ValidBoolean.from(dto.approved))
    if (approved instanceof BaseException) {
        errors.push(approved);
    }
    const deliveryName = wrapType<ValidString,BaseException>(
        () => ValidString.from(dto.deliveryName))
    if (deliveryName instanceof BaseException) {
        errors.push(deliveryName);
    }
    const paymentValue = wrapType<ValidInteger,BaseException>(
        () => ValidInteger.from(dto.paymentValue))
    if (paymentValue instanceof BaseException) {
        errors.push(paymentValue);
    }
    const paymentMethod = wrapType<PaymentMethod,BaseException>(
        () => PaymentMethod.from(dto.paymentMethod))
    if (paymentMethod instanceof BaseException) {
        errors.push(paymentMethod);
    }
    return {
        errors,
        data: {
            id: id as UUID,
            creationDate: creationDate as ValidDate,
            approved: approved as ValidBoolean,
            deliveryName: deliveryName as ValidString,
            paymentValue: paymentValue as ValidInteger,
            paymentMethod: paymentMethod as PaymentMethod
        }
    }
}