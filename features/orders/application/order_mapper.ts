import {
	paymentFromJson,
	paymentToJson
} from '../../payments/application/payment_mapper'
import { Payment } from '../../payments/domain/models/payment'
import { EmailException } from '../../shared/domain/exceptions/EmailException'
import { InvalidBooleanException } from '../../shared/domain/exceptions/InvalidBooleanException'
import { wrapType } from '../../shared/utils/WrapType'
import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { InvalidUUIDException } from '../../shared/domain/exceptions/InvalidUUIDException'
import { UUID } from '../../shared/domain/value_objects/UUID'
import { Order } from '../domain/order'
import { Email } from '../../shared/domain/value_objects/Email'
import { ValidDate } from '../../shared/domain/value_objects/ValidDate'
import { InvalidDateException } from '../../shared/domain/exceptions/InvalidDateException'
import { ValidBool } from '../../shared/domain/value_objects/ValidBool'

export function orderToJson( order: Order ): Record<string, any> {
	return {
		id          : order.id.value,
		seller_email: order.seller_email.value,
		client_email: order.client_email.value,
		created_at  : order.creation_date.value,
		approved    : order.approved.value,
		payment  :  paymentToJson(order.payment)
	}
}

export function orderFromJson( json: Record<string, any> ): Order | BaseException[] {
	const errors: BaseException[] = []

	const id = wrapType<UUID, InvalidUUIDException>(
		() => UUID.from( json.id ) )

	if ( id instanceof BaseException ) {
		errors.push( new InvalidUUIDException() )
	}

	const seller_email = wrapType<Email, EmailException>(
		() => Email.from( json.seller_email ) )

	if ( seller_email instanceof BaseException ) {
		errors.push( new EmailException( 'seller_email' ) )
	}

	const client_email = wrapType<Email, EmailException>(
		() => Email.from( json.client_email ) )

	if ( client_email instanceof BaseException ) {
		errors.push( new EmailException( 'client_email' ) )
	}

	const created_at = wrapType<ValidDate, InvalidDateException>(
		() => ValidDate.from( json.created_at ) )

	if ( created_at instanceof BaseException ) {

		errors.push( new InvalidDateException( 'created_at' ) )
	}

	const approved = wrapType<ValidBool, InvalidBooleanException>(
		() => ValidBool.from( json.approved ) )

	if ( approved instanceof BaseException ) {

		errors.push( new InvalidBooleanException( 'approved' ) )
	}

	const payment = paymentFromJson( json.payment )

	if ( payment instanceof BaseException ) {
		errors.push( payment )
	}

	if ( errors.length > 0 ) {
		throw errors
	}

	return new Order(
		id as UUID,
		seller_email as Email,
		client_email as Email,
		created_at as ValidDate,
		approved as ValidBool,
		payment as Payment
	)
}
