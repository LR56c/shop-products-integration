import {BaseException} from "../../shared/domain/exceptions/BaseException";
import {Payment} from "../domain/models/payment";
import {wrapType} from "../../shared/utils/WrapType";
import {UUID} from "../../shared/domain/value_objects/UUID";
import {InvalidUUIDException} from "../../shared/domain/exceptions/InvalidUUIDException";
import {ValidDate} from "../../shared/domain/value_objects/ValidDate";
import {InvalidDateException} from "../../shared/domain/exceptions/InvalidDateException";
import {InvalidBooleanException} from "../../shared/domain/exceptions/InvalidBooleanException";
import {ValidString} from "../../shared/domain/value_objects/ValidString";
import {InvalidStringException} from "../../shared/domain/exceptions/InvalidStringException";
import {ValidInteger} from "../../shared/domain/value_objects/ValidInteger";
import {InvalidIntegerException} from "../../shared/domain/exceptions/InvalidIntegerException";
import {PaymentMethod} from "../domain/models/payment_method";
import {PaymentMethodException} from "../domain/exceptions/PaymentMethodException";

export function paymentToJson(payment: Payment): Record<string, any> {
    return {
        id: payment.id.value,
        approved: payment.approved.value,
        delivery_address: payment.deliveryName.value,
        value: payment.paymentValue.value,
        payment_method: payment.paymentMethod.value
    }
}
export function paymentFromJson (json: Record<string, any>): Payment | BaseException[] {
    const errors: BaseException[] = []
	const id = wrapType<UUID, InvalidUUIDException>(
		() => UUID.from(json.id))
	if (id instanceof BaseException) {
		errors.push(new InvalidUUIDException('id'))
	}
	const creationDate = wrapType<ValidDate, InvalidDateException>(
		() => ValidDate.from(json.creationDate))
	if (creationDate instanceof BaseException) {
		errors.push(new InvalidDateException('creationDate'))
	}
	const approved = wrapType<ValidBool, InvalidBooleanException>(
		() => ValidBool.from(json.approved))
	if (approved instanceof BaseException) {
		errors.push(new InvalidBooleanException('approved'))
	}
	const deliveryName = wrapType<ValidString, InvalidStringException>(
		() => ValidString.from(json.deliveryName))
	if (deliveryName instanceof BaseException) {
		errors.push(new InvalidStringException('deliveryName'))
	}
	const paymentValue = wrapType<ValidInteger, InvalidIntegerException>(
		() => ValidInteger.from(json.paymentValue))
	if (paymentValue instanceof BaseException) {
		errors.push(new InvalidIntegerException('paymentValue'))
	}
	const paymentMethod = wrapType<PaymentMethod, PaymentMethodException>(
		() => PaymentMethod.from(json.paymentMethod))
	if (paymentMethod instanceof BaseException) {
		errors.push(new PaymentMethodException('paymentMethod'))
	}
    if (errors.length > 0) {
        throw errors
    }
    return new Payment(
        id as UUID,
        creationDate as ValidDate,
        approved as ValidBoolean,
        deliveryName as ValidString,
        paymentValue as ValidInteger,
        paymentMethod as PaymentMethod)
}
