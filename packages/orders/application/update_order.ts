import { Errors } from '../../shared/domain/exceptions/errors'
import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { InvalidIntegerException } from '../../shared/domain/exceptions/InvalidIntegerException'
import { InvalidUUIDException } from '../../shared/domain/exceptions/InvalidUUIDException'
import { Email } from '../../shared/domain/value_objects/email'
import { UUID } from '../../shared/domain/value_objects/uuid'
import { ValidInteger } from '../../shared/domain/value_objects/valid_integer'
import {
	wrapType,
	wrapTypeDefault,
	wrapTypeErrors
} from '../../shared/utils/wrap_type'
import {
	Order,
	OrderProduct
} from '../domain/order'
import { OrderRepository } from '../domain/order_repository'
import { OrderResponse } from '../domain/order_response'

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
	} ): Promise<boolean | Errors> => {

	const errors: BaseException[] = []

	const clientEmailResult= wrapTypeDefault(
		undefined,
		( value ) => Email.from( value ),
		props.client_email
	)

	if ( clientEmailResult instanceof BaseException ) {
		errors.push( clientEmailResult )
	}

	const paymentIdResult = wrapTypeDefault(
		undefined,
		( value ) => UUID.from( value ),
		props.payment_id
	)

	if ( paymentIdResult instanceof BaseException ) {
		errors.push( paymentIdResult )
	}

	const sellerEmailResult = wrapTypeDefault(
		undefined,
		( value ) => Email.from( value ),
		props.seller_email
	)

	if ( sellerEmailResult instanceof BaseException ) {
		errors.push( sellerEmailResult )
	}

	const orderConfirmedResult = wrapTypeDefault(
		undefined,
		( value ) => UUID.from( value ),
		props.order_confirmed_id
	)

	if ( orderConfirmedResult !== undefined && orderConfirmedResult instanceof
		BaseException )
	{
		errors.push( orderConfirmedResult )
	}

	const itemConfirmedResult = wrapTypeDefault(
		undefined,
		( value ) => UUID.from( value ),
		props.item_confirmed_id
	)

	if ( itemConfirmedResult instanceof BaseException ) {
		errors.push( itemConfirmedResult )
	}

	const products = props.products !== undefined ? props.products.map(
		validateOrderProduct ) : order.products.map( p => new OrderProduct( p.quantity, p.product.id ) )

	if ( errors.length > 0 ) {
		return new Errors( errors )
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
	return await wrapTypeErrors(() => repo.updateOrder( orderID, newOrder ))
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
