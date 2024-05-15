import { ValidInteger } from '~features/shared/domain/value_objects/ValidInteger'
import { CreateOrderDto } from 'src/orders/dto/create_order_dto'
import {
	PartialOrder,
	PartialOrderProduct
} from '~features/orders/domain/order'
import { BaseException } from '~features/shared/domain/exceptions/BaseException'
import { EmailException } from '~features/shared/domain/exceptions/EmailException'
import { InvalidUUIDException } from '~features/shared/domain/exceptions/InvalidUUIDException'
import { Email } from '~features/shared/domain/value_objects/Email'
import { UUID } from '~features/shared/domain/value_objects/UUID'
import { wrapType } from '~features/shared/utils/WrapType'

export function parsePartialOrder( dto: CreateOrderDto ): PartialOrder
{
	const errors: BaseException[] = []

	const client_email = wrapType<Email, EmailException>(
		() => Email.from( dto.client_email ) )

	if ( client_email instanceof BaseException ) {
		errors.push( new EmailException( 'client_email' ) )
	}

	const payment = wrapType<UUID, InvalidUUIDException>(
		() => UUID.from( dto.payment_id ) )

	if ( payment instanceof BaseException ) {
		errors.push( new InvalidUUIDException( 'payment_id' ) )
	}

	let sellerResult: Email | undefined = undefined
	if ( dto.seller_email !== undefined ) {
		const seller_email = wrapType<Email, EmailException>(
			() => Email.from( dto.seller_email ) )
		if ( seller_email instanceof BaseException ) {
			errors.push( seller_email )
		}
		else {
			sellerResult = seller_email
		}
	}

	let orderResult: UUID | undefined = undefined

	if ( dto.order_confirmed !== undefined ) {
		const order_confirmed = wrapType<UUID, InvalidUUIDException>(
			() => UUID.from( dto.order_confirmed ) )
		if ( order_confirmed instanceof BaseException ) {
			errors.push( order_confirmed )
		}
		else {
			orderResult = order_confirmed
		}
	}

	let itemResult: UUID | undefined = undefined
	if ( dto.item_confirmed !== undefined ) {
		const item_confirmed = wrapType<UUID, InvalidUUIDException>(
			() => UUID.from( dto.item_confirmed ) )
		if ( item_confirmed instanceof BaseException ) {
			errors.push( item_confirmed )
		}
		else {
			itemResult = item_confirmed
		}
	}

	const products: PartialOrderProduct[] = []

	for ( const product of dto.products ) {
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

		products.push( new PartialOrderProduct( q, p ) )
	}

	if ( errors.length > 0 ) {
		throw errors
	}

	return new PartialOrder(
		client_email as Email,
		payment as UUID,
		products,
		sellerResult,
		orderResult,
		itemResult
	)
}
