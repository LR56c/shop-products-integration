import { itemConfirmedFromJson } from '../../item_confirmed/application/item_confimed_mapper'
import { ItemConfirmed } from '../../item_confirmed/domain/item_confirmed'
import { orderConfirmedFromJson } from '../../order_confirmed/application/order_confirmed_mapper'
import { OrderConfirmed } from '../../order_confirmed/domain/order_confirmed'
import {
	productFromJson,
	productToJson
} from '../../products/application/product_mapper'
import { Product } from '../../products/domain/models/product'
import {
	paymentFromJson,
	paymentToJson
} from '../../payments/application/payment_mapper'
import { Payment } from '../../payments/domain/models/payment'
import { EmailException } from '../../shared/domain/exceptions/EmailException'
import { wrapType } from '../../shared/utils/WrapType'
import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { InvalidUUIDException } from '../../shared/domain/exceptions/InvalidUUIDException'
import { UUID } from '../../shared/domain/value_objects/UUID'
import { Order } from '../domain/order'
import { Email } from '../../shared/domain/value_objects/Email'
import { ValidDate } from '../../shared/domain/value_objects/ValidDate'
import { InvalidDateException } from '../../shared/domain/exceptions/InvalidDateException'

export function orderToJson( order: Order ): Record<string, any> {
	return {
		id             : order.id.value,
		client_email   : order.client_email.value,
		created_at     : order.creation_date.value,
		payment        : paymentToJson( order.payment ),
		products       : order.products.map( product => productToJson( product ) ),
		seller_email   : order.seller_email?.value,
		order_confirmed: order.order_confirmed?.id.value,
		item_confirmed : order.item_confirmed?.id.value
	}
}

export function orderFromJson( json: Record<string, any> ): Order | BaseException[] {
	const errors: BaseException[] = []
	const id                      = wrapType<UUID, InvalidUUIDException>(
		() => UUID.from( json.id ) )

	if ( id instanceof BaseException ) {
		errors.push( new InvalidUUIDException() )
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

	const payment = paymentFromJson( json.payment )

	if ( payment instanceof BaseException ) {
		errors.push( payment )
	}

	const products: Product[] = []

	if ( json.products !== null ) {
		for ( const product of json.products ) {

			const p = productFromJson( product )

			if ( p instanceof BaseException ) {
				errors.push( p )
				break
			}
			products.push( p as Product )
		}
	}

	let sellerResult: Email | undefined = undefined
	if ( json.seller_email !== null ) {
		const seller_email = wrapType<Email, EmailException>(
			() => Email.from( json.seller_email ) )
		if ( seller_email instanceof BaseException ) {
			errors.push( seller_email )
		}
		else {
			sellerResult = seller_email as Email
		}
	}

	let itemResult: ItemConfirmed | undefined = undefined
	if ( json.item_confirmed !== null ) {
		const item_confirmed = itemConfirmedFromJson( json.item_confirmed )

		if ( item_confirmed instanceof BaseException ) {
			errors.push( item_confirmed )
		}
		else {
			itemResult = item_confirmed as ItemConfirmed
		}
	}

	let orderResult: OrderConfirmed | undefined = undefined
	if ( json.orders_confirmed !== null ) {
		const order_confirmed = orderConfirmedFromJson( json.orders_confirmed )

		if ( order_confirmed instanceof BaseException ) {
			errors.push( order_confirmed )
		}
		else {
			orderResult = order_confirmed as OrderConfirmed
		}
	}

	if ( errors.length > 0 ) {
		throw errors
	}

	return new Order(
		id as UUID,
		client_email as Email,
		created_at as ValidDate,
		payment as Payment,
		products,
		sellerResult,
		orderResult,
		itemResult
	)
}
