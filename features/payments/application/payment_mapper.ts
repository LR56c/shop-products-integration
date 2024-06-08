import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { InvalidBooleanException } from '../../shared/domain/exceptions/InvalidBooleanException'
import { InvalidDateException } from '../../shared/domain/exceptions/InvalidDateException'
import { InvalidIntegerException } from '../../shared/domain/exceptions/InvalidIntegerException'
import { InvalidStringException } from '../../shared/domain/exceptions/InvalidStringException'
import { InvalidUUIDException } from '../../shared/domain/exceptions/InvalidUUIDException'
import { UUID } from '../../shared/domain/value_objects/UUID'
import { ValidBool } from '../../shared/domain/value_objects/ValidBool'
import { ValidDate } from '../../shared/domain/value_objects/ValidDate'
import { ValidInteger } from '../../shared/domain/value_objects/ValidInteger'
import { ValidString } from '../../shared/domain/value_objects/ValidString'
import { wrapType } from '../../shared/utils/WrapType'
import { PaymentMethodException } from '../domain/exceptions/PaymentMethodException'
import { Payment } from '../domain/models/payment'
import { PaymentMethod } from '../domain/models/payment_method'

export function paymentToJson( payment: Payment ): Record<string, any> {
	return {
		id              : payment.id.value,
		created_at      : payment.creationDate.value,
		approved        : payment.approved.value,
		delivery_address: payment.deliveryName.value,
		value           : payment.paymentValue.value,
		payment_method  : payment.paymentMethod.value
	}
}

export function paymentFromJson( json: Record<string, any> ): Payment | BaseException[] {
	const errors: BaseException[] = []
	const id                      = wrapType<UUID, InvalidUUIDException>(
		() => UUID.from( json.id ) )
	if ( id instanceof BaseException ) {
		errors.push( new InvalidUUIDException( 'id' ) )
	}
	const creationDate = wrapType<ValidDate, InvalidDateException>(
		() => ValidDate.from( json.created_at ) )
	if ( creationDate instanceof BaseException ) {
		errors.push( new InvalidDateException( 'creationDate' ) )
	}
	const approved = wrapType<ValidBool, InvalidBooleanException>(
		() => ValidBool.from( json.approved ) )
	if ( approved instanceof BaseException ) {
		errors.push( new InvalidBooleanException( 'approved' ) )
	}
	const deliveryName = wrapType<ValidString, InvalidStringException>(
		() => ValidString.from( json.delivery_address ) )
	if ( deliveryName instanceof BaseException ) {
		errors.push( new InvalidStringException( 'deliveryName' ) )
	}
	const paymentValue = wrapType<ValidInteger, InvalidIntegerException>(
		() => ValidInteger.from( json.value ) )
	if ( paymentValue instanceof BaseException ) {
		errors.push( new InvalidIntegerException( 'paymentValue' ) )
	}
	const paymentMethod = wrapType<PaymentMethod, PaymentMethodException>(
		() => PaymentMethod.from( json.payment_method ) )
	if ( paymentMethod instanceof BaseException ) {
		errors.push( new PaymentMethodException( 'paymentMethod' ) )
	}
	if ( errors.length > 0 ) {
		throw errors
	}
	return new Payment(
		id as UUID,
		creationDate as ValidDate,
		approved as ValidBool,
		deliveryName as ValidString,
		paymentValue as ValidInteger,
		paymentMethod as PaymentMethod )
}
