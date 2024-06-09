import { itemConfirmedFromJson } from '../../item_confirmed/application/item_confimed_mapper'
import { ItemConfirmed } from '../../item_confirmed/domain/item_confirmed'
import { orderConfirmedFromJson } from '../../order_confirmed/application/order_confirmed_mapper'
import { OrderConfirmed } from '../../order_confirmed/domain/order_confirmed'
import {
	paymentFromJson,
	paymentToJson
} from '../../payments/application/payment_mapper'
import { Payment } from '../../payments/domain/models/payment'
import {
	productFromJson,
	productToJson
} from '../../products/application/product_mapper'
import { Product } from '../../products/domain/models/product'
import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { EmailException } from '../../shared/domain/exceptions/EmailException'
import { Errors } from '../../shared/domain/exceptions/errors'
import { InvalidDateException } from '../../shared/domain/exceptions/InvalidDateException'
import { InvalidIntegerException } from '../../shared/domain/exceptions/InvalidIntegerException'
import { InvalidUUIDException } from '../../shared/domain/exceptions/InvalidUUIDException'
import { Email } from '../../shared/domain/value_objects/email'
import { UUID } from '../../shared/domain/value_objects/uuid'
import { ValidDate } from '../../shared/domain/value_objects/valid_date'
import { ValidInteger } from '../../shared/domain/value_objects/valid_integer'
import { wrapType } from '../../shared/utils/wrap_type'
import {
	Order,
	OrderProduct
} from '../domain/order'
import {
	OrderProductResponse,
	OrderResponse
} from '../domain/order_response'

export function orderToJson( order: Order ): Record<string, any> {
	const jsonProducts = order.products.map( p => ( {
		quantity  : p.quantity.value,
		product_id: p.product
	} ) )
	return {
		id             : order.id.value,
		client_email   : order.client_email.value,
		created_at     : order.creation_date.value,
		payment_id     : order.payment.value,
		products       : jsonProducts,
		seller_email   : order.seller_email?.value ?? null,
		order_confirmed: order.order_confirmed?.value ?? null,
		item_confirmed : order.item_confirmed?.value ?? null
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

	const payment = wrapType<UUID, InvalidUUIDException>(
		() => UUID.from( json.payment ) )

	if ( id instanceof BaseException ) {
		errors.push( new InvalidUUIDException() )
	}

	const products: OrderProduct[] = []

	if ( json.products !== null ) {
		for ( const product of json.products ) {
			const p = wrapType<UUID, InvalidUUIDException>(
				() => UUID.from( json.product_id ) )

			if ( p instanceof BaseException ) {
				errors.push( new InvalidUUIDException() )
			}

			const q = wrapType<ValidInteger, InvalidIntegerException>(
				() => ValidInteger.from( product.quantity ) )

			if ( q instanceof BaseException ) {
				errors.push( q )
				break
			}
			products.push( new OrderProduct(
				q as ValidInteger,
				p as UUID
			) )
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

	let itemResult: UUID | undefined = undefined
	if ( json.item_confirmed !== null ) {
		const item = wrapType<UUID, InvalidUUIDException>(
			() => UUID.from( json.item_confirmed ) )

		if ( item instanceof BaseException ) {
			errors.push( new InvalidUUIDException() )
		}
		else {
			itemResult = item as UUID
		}
	}

	let orderResult: UUID | undefined = undefined
	if ( json.orders_confirmed !== null ) {
		const order = wrapType<UUID, InvalidUUIDException>(
			() => UUID.from( json.orders_confirmed ) )

		if ( order instanceof BaseException ) {
			errors.push( new InvalidUUIDException() )
		}
		else {
			orderResult = order as UUID
		}
	}

	if ( errors.length > 0 ) {
		throw errors
	}

	return new Order(
		id as UUID,
		client_email as Email,
		created_at as ValidDate,
		payment as UUID,
		products,
		sellerResult,
		orderResult,
		itemResult
	)
}


export function orderResponseToJson( order: OrderResponse ): Record<string, any> {
	const jsonProducts = order.products.map( p => ( {
		quantity: p.quantity.value,
		product : productToJson( p.product )
	} ) )
	return {
		id             : order.id.value,
		client_email   : order.client_email.value,
		created_at     : order.creation_date.value,
		payment        : paymentToJson( order.payment ),
		products       : jsonProducts,
		seller_email   : order.seller_email === undefined
			? null
			: order.seller_email.value,
		order_confirmed: order.order_confirmed === undefined
			? null
			: order.order_confirmed.id.value,
		item_confirmed : order.item_confirmed === undefined
			? null
			: order.item_confirmed.id.value
	}
}


export function orderResponseFromJson( json: Record<string, any> ): OrderResponse | BaseException[] {
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

	const payment = paymentFromJson( json.payments )

	if ( payment instanceof Errors ) {
		errors.push( ...payment.values )
	}

	const products: OrderProductResponse[] = []

	if ( json.products !== null ) {
		for ( const product of json.products ) {

			const p = productFromJson( product )

			if ( p instanceof Errors ) {
				errors.push( ...p.values )
				break
			}

			const q = wrapType<ValidInteger, InvalidIntegerException>(
				() => ValidInteger.from( product.quantity ) )

			if ( q instanceof BaseException ) {
				errors.push( q )
				break
			}
			products.push( new OrderProductResponse(
				q as ValidInteger,
				p as Product
			) )
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
		return errors
	}

	return new OrderResponse(
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
