import { Errors } from '../../shared/domain/exceptions/errors'
import { ValidBool } from '../../shared/domain/value_objects/valid_bool'
import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { Payment } from '../domain/models/payment'
import { wrapType } from '../../shared/utils/wrap_type'
import { UUID } from '../../shared/domain/value_objects/uuid'
import { InvalidUUIDException } from '../../shared/domain/exceptions/InvalidUUIDException'
import { ValidDate } from '../../shared/domain/value_objects/valid_date'
import { InvalidDateException } from '../../shared/domain/exceptions/InvalidDateException'
import { InvalidBooleanException } from '../../shared/domain/exceptions/InvalidBooleanException'
import { ValidString } from '../../shared/domain/value_objects/valid_string'
import { InvalidStringException } from '../../shared/domain/exceptions/InvalidStringException'
import { ValidInteger } from '../../shared/domain/value_objects/valid_integer'
import { InvalidIntegerException } from '../../shared/domain/exceptions/InvalidIntegerException'
import { PaymentMethod } from '../domain/models/payment_method'
import { PaymentMethodException } from '../domain/exceptions/PaymentMethodException'

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

export function paymentFromJson( json: Record<string, any> ): Payment | Errors {
	const errors: BaseException[] = []

	const id = wrapType<UUID, InvalidUUIDException>(
		() => UUID.from( json.id )
	)
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
		return new Errors( errors )
	}

	return new Payment(
		id as UUID,
		creationDate as ValidDate,
		approved as ValidBool,
		deliveryName as ValidString,
		paymentValue as ValidInteger,
		paymentMethod as PaymentMethod )
}
