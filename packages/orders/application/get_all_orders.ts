import { Errors } from 'packages/shared/domain/exceptions/errors'
import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { EmailException } from '../../shared/domain/exceptions/EmailException'
import { InvalidIntegerException } from '../../shared/domain/exceptions/InvalidIntegerException'
import { Email } from '../../shared/domain/value_objects/email'
import { ValidInteger } from '../../shared/domain/value_objects/valid_integer'
import {
	wrapType,
	wrapTypeDefault,
	wrapTypeErrors
} from '../../shared/utils/wrap_type'
import { OrderRepository } from '../domain/order_repository'
import { OrderResponse } from '../domain/order_response'

export const GetAllOrders = async ( repo: OrderRepository,
	props: {
		from: number,
		to: number,
		email?: string,
	} ): Promise<OrderResponse[] | Errors> => {

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

	const emailResult= wrapTypeDefault(
		undefined,
		( value ) => Email.from( value ),
		props.email

	)

	if ( emailResult !== undefined && emailResult instanceof BaseException ) {
		errors.push( emailResult )
	}

	if ( errors.length > 0 ) {
		return new Errors( errors )
	}

	return await wrapTypeErrors(()=>repo.getAll(
			fromResult as ValidInteger,
			toResult as ValidInteger,
			emailResult as Email
		)
	)
}
