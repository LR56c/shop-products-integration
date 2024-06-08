import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { EmailException } from '../../shared/domain/exceptions/EmailException'
import { InvalidDateException } from '../../shared/domain/exceptions/InvalidDateException'
import { InvalidUUIDException } from '../../shared/domain/exceptions/InvalidUUIDException'
import { Email } from '../../shared/domain/value_objects/Email'
import { UUID } from '../../shared/domain/value_objects/UUID'
import { ValidDate } from '../../shared/domain/value_objects/ValidDate'
import { ValidInteger } from '../../shared/domain/value_objects/ValidInteger'
import { wrapType } from '../../shared/utils/WrapType'
import {
	Order,
	OrderProduct
} from '../domain/order'
import { OrderRepository } from '../domain/order_repository'

export const CreateOrder = async ( repo: OrderRepository,
	props: {
		id?: string
		client_email: string,
		payment_id: string,
		products?: {
			quantity: number,
			product_id: string,
		}[],
		seller_email?: string,
		order_confirmed_id?: string,
		item_confirmed_id?: string,
	} ): Promise<boolean> => {

	const errors: BaseException[] = []

	const client_email = wrapType<Email, EmailException>(
		() => Email.from( props.client_email ) )

	if ( client_email instanceof BaseException ) {
		errors.push( new EmailException( 'client_email' ) )
	}

	const payment = wrapType<UUID, InvalidUUIDException>(
		() => UUID.from( props.payment_id ) )

	if ( payment instanceof BaseException ) {
		errors.push( new InvalidUUIDException( 'payment_id' ) )
	}

	let sellerResult: Email | undefined = undefined
	if ( props.seller_email !== undefined ) {
		const seller_email = wrapType<Email, EmailException>(
			() => Email.from( props.seller_email! ) )
		if ( seller_email instanceof BaseException ) {
			errors.push( seller_email )
		}
		else {
			sellerResult = seller_email
		}
	}

	let orderResult: UUID | undefined = undefined

	if ( props.order_confirmed_id !== undefined ) {
		const order_confirmed = wrapType<UUID, InvalidUUIDException>(
			() => UUID.from( props.order_confirmed_id! ) )
		if ( order_confirmed instanceof BaseException ) {
			errors.push( order_confirmed )
		}
		else {
			orderResult = order_confirmed
		}
	}

	let itemResult: UUID | undefined = undefined
	if ( props.item_confirmed_id !== undefined ) {
		const item_confirmed = wrapType<UUID, InvalidUUIDException>(
			() => UUID.from( props.item_confirmed_id! ) )
		if ( item_confirmed instanceof BaseException ) {
			errors.push( item_confirmed )
		}
		else {
			itemResult = item_confirmed
		}
	}

	const creationDate = wrapType<ValidDate, InvalidDateException>(
		() => ValidDate.from( new Date() ) )

	if ( creationDate instanceof BaseException ) {
		errors.push( creationDate )
	}

	const idResult = props.id === undefined
		? UUID.create()
		: wrapType<UUID, InvalidUUIDException>(
			() => UUID.from( props.id! ) )

	if ( idResult instanceof BaseException ) {
		errors.push( idResult )
	}

	const products: OrderProduct[] = []

	if ( props.products !== undefined ) {
		for ( const product of props.products ) {
			const p = wrapType<UUID, InvalidUUIDException>(
				() => UUID.from( product.product_id ) )

			if ( p instanceof BaseException ) {
				errors.push( p )
				break
			}

			const q = wrapType<ValidInteger, BaseException>(
				() => ValidInteger.from( product.quantity ) )

			if ( q instanceof BaseException ) {
				errors.push( q )
				break
			}

			products.push( new OrderProduct( q, p ) )
		}
	}

	if ( errors.length > 0 ) {
		throw errors
	}

	return await repo.createOrder(
		new Order(
			idResult as UUID,
			client_email as Email,
			creationDate as ValidDate,
			payment as UUID,
			products,
			sellerResult,
			orderResult,
			itemResult
		)
	)
}
