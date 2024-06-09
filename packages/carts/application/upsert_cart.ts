import { Errors } from '../../shared/domain/exceptions/errors'
import { Email } from '../../shared/domain/value_objects/email'
import { UUID } from '../../shared/domain/value_objects/uuid'
import { ValidInteger } from '../../shared/domain/value_objects/valid_integer'
import {
	wrapType,
	wrapTypeAsync,
	wrapTypeErrors
} from '../../shared/utils/wrap_type'
import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { EmailException } from '../../shared/domain/exceptions/EmailException'
import { InvalidIntegerException } from '../../shared/domain/exceptions/InvalidIntegerException'
import { InvalidUUIDException } from '../../shared/domain/exceptions/InvalidUUIDException'
import { CartRepository } from '../domain/cart_repository'

export const UpsertCart = async ( repo: CartRepository, props: {
	user_email: string, product_id: string, quantity: number
} ): Promise<boolean | Errors> => {

	const errors: BaseException[] = []

	const emailResult = wrapType<Email, EmailException>(
		() => Email.from( props.user_email ) )

	if ( emailResult instanceof BaseException ) {
		errors.push( new EmailException() )
	}

	const productIDResult = wrapType<UUID, BaseException>(
		() => UUID.from( props.product_id ) )

	if ( productIDResult instanceof BaseException ) {
		errors.push( new InvalidUUIDException() )
	}

	if ( errors.length > 0 ) {
		return new Errors( errors )
	}

	const existCartsUser = await wrapTypeErrors(
		() => repo.getByUserEmail( emailResult as Email ) )

	if ( existCartsUser instanceof Errors ) {
		return existCartsUser
	}

	let checkedQuantity = 0

	const existCart = existCartsUser.find(
		p => p.product.id.value === productIDResult.value )

	if ( existCart !== undefined ) {

		let resultQuantity = 0

		resultQuantity = existCart.quantity.value + props.quantity

		if ( resultQuantity <= 0 ) {
			await wrapTypeAsync(
				() => repo.remove( emailResult as Email, productIDResult as UUID ) )
		}
		checkedQuantity = resultQuantity
	}

	const quantityResult = wrapType<ValidInteger, InvalidIntegerException>(
		() => ValidInteger.from( checkedQuantity ) )

	if ( quantityResult instanceof BaseException ) {
		throw [ new InvalidIntegerException() ]
	}

	const result = await wrapTypeAsync(
		() => repo.upsert( emailResult as Email, productIDResult as UUID,
			quantityResult ) )

	if ( result instanceof BaseException ) {
		return new Errors( [ result ] )
	}
	return result
}
