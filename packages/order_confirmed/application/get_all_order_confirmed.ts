import { Errors } from 'packages/shared/domain/exceptions/errors'
import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { InvalidIntegerException } from '../../shared/domain/exceptions/InvalidIntegerException'
import { ValidInteger } from '../../shared/domain/value_objects/valid_integer'
import {
	wrapType,
	wrapTypeErrors
} from '../../shared/utils/wrap_type'
import { OrderConfirmed } from '../domain/order_confirmed'
import { OrderConfirmedRepository } from '../domain/order_confirmed_repository'

export const GetAllOrderConfirmed = async (
	repo: OrderConfirmedRepository,
	props: {
		from: number,
		to: number
	} ): Promise<OrderConfirmed[] | Errors> => {

	const errors: BaseException[] = []

	const fromResult = wrapType<ValidInteger, InvalidIntegerException>(
		() => ValidInteger.from( props.from ) )


	if ( fromResult instanceof BaseException ) {
		errors.push( new InvalidIntegerException( 'from' ) )
	}

	const toResult = wrapType<ValidInteger, InvalidIntegerException>(
		() => ValidInteger.from( props.to ) )

	if ( toResult instanceof BaseException ) {
		errors.push( new InvalidIntegerException( 'to' ) )
	}

	if ( errors.length > 0 ) {
		return new Errors( errors )
	}

	return await wrapTypeErrors(()=>
		repo.getAll( fromResult as ValidInteger, toResult as ValidInteger )
	)
}
