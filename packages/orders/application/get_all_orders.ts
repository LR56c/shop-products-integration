import { EmailException } from '../../shared/domain/exceptions/EmailException'
import { Email } from '../../shared/domain/value_objects/email'
import { InvalidIntegerException } from '../../shared/domain/exceptions/InvalidIntegerException'
import { ValidInteger } from '../../shared/domain/value_objects/valid_integer'
import { OrderResponse } from '../domain/order_response'
import { OrderRepository } from '../domain/order_repository'
import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { wrapType } from '../../shared/utils/wrap_type'

export const GetAllOrders = async ( repo: OrderRepository,
	props: {
		from: number,
		to: number,
		email?: string,
	} ): Promise<OrderResponse[]> => {

	const errors: BaseException[] = []

	const fromResult = wrapType<ValidInteger, InvalidIntegerException>(
		() => ValidInteger.from( props.from ) )

	if ( fromResult instanceof BaseException ) {
		errors.push( fromResult )
	}

	const toResult = wrapType<ValidInteger, InvalidIntegerException>(
		() => ValidInteger.from( props.to ) )

	if ( toResult instanceof BaseException ) {
		errors.push( toResult )
	}

	const emailResult = props.email === undefined
		? undefined
		: wrapType<Email, EmailException>(
			() => Email.from( props.email! ) )

	if ( emailResult !== undefined && emailResult instanceof BaseException ) {
		errors.push( emailResult )
	}

	if ( errors.length > 0 ) {
		throw errors
	}

	return repo.getAll(
		fromResult as ValidInteger,
		toResult as ValidInteger,
		emailResult as Email
	)

}
