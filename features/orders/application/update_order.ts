import { OrderResponse } from '../domain/order_response'
import { InvalidIntegerException } from '../../shared/domain/exceptions/InvalidIntegerException'
import { ValidInteger } from '../../shared/domain/value_objects/ValidInteger'
import {
	Order,
	OrderProduct
} from '../domain/order'
import { OrderRepository } from '../domain/order_repository'
import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { EmailException } from '../../shared/domain/exceptions/EmailException'
import { InvalidUUIDException } from '../../shared/domain/exceptions/InvalidUUIDException'
import { Email } from '../../shared/domain/value_objects/Email'
import { UUID } from '../../shared/domain/value_objects/UUID'
import {
	wrapType,
} from '../../shared/utils/WrapType'

export const UpdateOrder = async ( repo: OrderRepository,
	orderID: UUID,
	order: OrderResponse,
	props: {
		client_email?: string,
		payment_id?: string,
		products?: {
			quantity: number,
			product_id: string,
		}[],
		seller_email?: string,
		order_confirmed_id?: string,
		item_confirmed_id?: string,
	} ): Promise<boolean> => {

	const errors: BaseException[] = []

	const clientEmailResult = props.client_email !== undefined
		? wrapType<Email, EmailException>(
			() => Email.from( props.client_email ?? '' ) )
		: order.client_email

	if ( clientEmailResult instanceof BaseException ) {
		errors.push( clientEmailResult )
	}

	const paymentIdResult = props.payment_id !== undefined
		? wrapType<UUID, InvalidUUIDException>(
			() => UUID.from( props.payment_id ?? '' ) )
		: order.payment.id

	if ( paymentIdResult instanceof BaseException ) {
		errors.push( paymentIdResult )
	}

	const sellerEmailResult = props.seller_email !== undefined
		? wrapType<Email, EmailException>(
			() => Email.from( props.seller_email!) )
		: order.seller_email ?? undefined

	if ( sellerEmailResult instanceof BaseException ) {
		errors.push( sellerEmailResult )
	}

	const orderConfirmedResult = props.order_confirmed_id !== undefined
		? wrapType<UUID, InvalidUUIDException>(
			() => UUID.from( props.order_confirmed_id!) )
		: order.order_confirmed?.id ?? undefined

	if ( orderConfirmedResult !== undefined && orderConfirmedResult instanceof BaseException ) {
		errors.push( orderConfirmedResult )
	}

	const itemConfirmedResult = props.item_confirmed_id !== undefined
		? wrapType<UUID, InvalidUUIDException>(
			() => UUID.from( props.item_confirmed_id! ) )
		: order.item_confirmed?.id ?? undefined

	if ( itemConfirmedResult instanceof BaseException ) {
		errors.push( itemConfirmedResult )
	}

	const products = props.products !== undefined ? props.products.map(
		validateOrderProduct ) : order.products.map( p => new OrderProduct( p.quantity, p.product.id ))

	if ( errors.length > 0 ) {
		throw errors
	}
	const newOrder = new Order(
		order.id,
		clientEmailResult as Email,
		order.creation_date,
		paymentIdResult as UUID,
		products,
		sellerEmailResult as Email,
		orderConfirmedResult as UUID,
		itemConfirmedResult as UUID
	)
	return repo.updateOrder( orderID, newOrder )
}

function validateOrderProduct( product: {
	quantity: number,
	product_id: string,
} ): OrderProduct {
	const errors: BaseException[] = []

	const quantity = wrapType<ValidInteger, InvalidIntegerException>(
		() => ValidInteger.from( product.quantity ) )

	if ( quantity instanceof BaseException ) {
		errors.push( new InvalidIntegerException( 'quantity' ) )
	}

	const productID = wrapType<UUID, InvalidUUIDException>(
		() => UUID.from( product.product_id ) )

	if ( productID instanceof BaseException ) {
		errors.push( new InvalidUUIDException( 'product_id' ) )
	}

	if ( errors.length > 0 ) {
		throw errors
	}

	return new OrderProduct(
		quantity as ValidInteger,
		productID as UUID
	)
}
