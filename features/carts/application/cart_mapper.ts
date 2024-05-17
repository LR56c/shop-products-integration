import { productFromJson } from '../../products/application/product_mapper'
import { Product } from '../../products/domain/models/product'
import { EmailException } from '../../shared/domain/exceptions/EmailException'
import { InvalidIntegerException } from '../../shared/domain/exceptions/InvalidIntegerException'
import { Email } from '../../shared/domain/value_objects/Email'
import { ValidInteger } from '../../shared/domain/value_objects/ValidInteger'
import { wrapType } from '../../shared/utils/WrapType'
import {
	Cart,
} from '../domain/cart'
import { BaseException } from '../../shared/domain/exceptions/BaseException'
import {CartResponse} from "../domain/cart_response";
import {UUID} from "../../shared/domain/value_objects/UUID";
import {InvalidUUIDException} from "../../shared/domain/exceptions/InvalidUUIDException";

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

export function cartResponseToJson( cart: CartResponse ): Record<string, any>[] {
	return cart.products.map( product => {
		return {
			user_email: cart.userEmail.value,
			quantity  : product.quantity.value,
			product_id: product.product.product_code.value
		}
	} )
}
