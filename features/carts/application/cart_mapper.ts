import { productFromJson } from '../../products/application/product_mapper'
import { Product } from '../../products/domain/models/product'
import { EmailException } from '../../shared/domain/exceptions/EmailException'
import { InvalidIntegerException } from '../../shared/domain/exceptions/InvalidIntegerException'
import { Email } from '../../shared/domain/value_objects/Email'
import { ValidInteger } from '../../shared/domain/value_objects/ValidInteger'
import { wrapType } from '../../shared/utils/WrapType'
import {
	Cart,
	CartUser
} from '../domain/cart'
import { BaseException } from '../../shared/domain/exceptions/BaseException'

export function cartToJson( cart: Cart ): Record<string, any> {
	return {
		user_email: cart.userEmail.value,
		quantity  : cart.quantity.value,
		product_id: cart.product.product_code.value
	}
}

export function cartUserToCartToJson( cart: CartUser ): Record<string, any>[] {
	return cart.products.map( product => {
		return {
			user_email: cart.userEmail.value,
			quantity  : product.quantity.value,
			product_id: product.product.product_code.value
		}
	} )
}

export function cartFromJson( json: Record<string, any> ): Cart | BaseException[] {

	const errors: BaseException[] = []

	const product = productFromJson( json.product )
	if ( product instanceof BaseException ) {
		errors.push( product )
	}

	const userEmail = wrapType<Email, EmailException>(
		() => Email.from( json.user_email ) )

	if ( userEmail instanceof BaseException ) {
		errors.push( new EmailException() )
	}

	const quantity = wrapType<ValidInteger, InvalidIntegerException>(
		() => ValidInteger.from( json.quantity ) )

	if ( quantity instanceof BaseException ) {
		errors.push( new InvalidIntegerException( 'quantity' ) )
	}

	if ( errors.length > 0 ) {
		throw errors
	}

	return new Cart(
		userEmail as Email,
		product as Product,
		quantity as ValidInteger
	)
}
