import {
	productFromJson,
	productToJson
} from '../../products/application/product_mapper'
import { Product } from '../../products/domain/models/product'
import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { EmailException } from '../../shared/domain/exceptions/EmailException'
import { InvalidIntegerException } from '../../shared/domain/exceptions/InvalidIntegerException'
import { InvalidUUIDException } from '../../shared/domain/exceptions/InvalidUUIDException'
import { Email } from '../../shared/domain/value_objects/Email'
import { UUID } from '../../shared/domain/value_objects/UUID'
import { ValidInteger } from '../../shared/domain/value_objects/ValidInteger'
import { wrapType } from '../../shared/utils/WrapType'
import { Cart } from '../domain/cart'
import { CartProductResponse } from '../domain/cart_response'

export function cartToJson( cart: Cart ): Record<string, any> {
	return {
		user_email: cart.userEmail.value,
		quantity  : cart.quantity.value,
		product_id: cart.product.value
	}
}

export function cartFromJson( json: Record<string, any> ): Cart | BaseException[] {

	const errors: BaseException[] = []

	const product = wrapType<UUID, InvalidUUIDException>(
		() => UUID.from( json.product_id ) )

	if ( product instanceof BaseException ) {
		errors.push( new InvalidUUIDException( 'product_id' ) )

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
		product as UUID,
		quantity as ValidInteger
	)
}

export function cartProductResponseFromJson( json: Record<string, any> ): CartProductResponse | BaseException[]{

	const errors: BaseException[] = []

	const product = productFromJson( json.products )

	if ( product instanceof BaseException ) {
		errors.push( product )

	}
	const quantity = wrapType<ValidInteger, InvalidIntegerException>(
		() => ValidInteger.from( json.quantity ) )

	if ( quantity instanceof BaseException ) {
		errors.push( new InvalidIntegerException( 'quantity' ) )
	}

	if ( errors.length > 0 ) {
		return errors
	}

	return new CartProductResponse(
		quantity as ValidInteger,
		product as Product
	)
}


export function cartProductResponseToJson( cart: CartProductResponse ): Record<string, any> {
		return {
			quantity  : cart.quantity.value,
			product: productToJson(cart.product)
		}
}
