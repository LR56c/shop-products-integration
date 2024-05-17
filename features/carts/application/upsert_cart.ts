import { CartRepository } from '../domain/cart_repository'
import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { EmailException } from '../../shared/domain/exceptions/EmailException'
import { InvalidIntegerException } from '../../shared/domain/exceptions/InvalidIntegerException'
import { InvalidUUIDException } from '../../shared/domain/exceptions/InvalidUUIDException'
import { Email } from '../../shared/domain/value_objects/Email'
import { UUID } from '../../shared/domain/value_objects/UUID'
import { ValidInteger } from '../../shared/domain/value_objects/ValidInteger'
import { wrapType } from '../../shared/utils/WrapType'

export const UpsertCart = async ( repo: CartRepository, props: {
	user_email: string, product_id: string, quantity: number
} ): Promise<boolean> => {

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
		throw errors
	}

	const existCartsUser = await repo.getByUserEmail( emailResult as Email )
	let checkedQuantity  = 0

	const existCart = existCartsUser.find(
		p => p.product.id.value === productIDResult.value )

	if ( existCart !== undefined ) {

		let resultQuantity = 0

		resultQuantity = existCart.quantity.value + props.quantity

		if ( resultQuantity <= 0 ) {
			return await repo.remove( emailResult as Email, productIDResult as UUID )
		}
		checkedQuantity = resultQuantity
	}

	const quantityResult = wrapType<ValidInteger, InvalidIntegerException>(
		() => ValidInteger.from( checkedQuantity ) )

	if ( quantityResult instanceof BaseException ) {
		throw [ new InvalidIntegerException() ]
	}

	return await repo.upsert( emailResult as Email, productIDResult as UUID,
		quantityResult )
}
