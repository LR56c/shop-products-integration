import { ItemConfirmed } from '../domain/item_confirmed'
import { ItemConfirmedRepository } from '../domain/item_confirmed_repository'
import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { Errors } from '../../shared/domain/exceptions/errors'
import { ValidInteger } from '../../shared/domain/value_objects/valid_integer'
import {
	wrapType,
	wrapTypeErrors
} from '../../shared/utils/wrap_type'

export const GetAllItemConfirmed = async ( repo: ItemConfirmedRepository, props:{
	from: number,
		to: number
}): Promise<ItemConfirmed[] | Errors>=>{
	const errors : BaseException[] = []

	const fromResult = wrapType( () => ValidInteger.from( props.from ) )

	if( fromResult instanceof BaseException ) {
		errors.push( fromResult )
	}

	const toResult = wrapType( () => ValidInteger.from( props.to ) )

	if( toResult instanceof BaseException ) {
		errors.push( toResult )
	}

	if( errors.length > 0 ) {
		return new Errors( errors )
	}

	return await wrapTypeErrors(()=> repo.getAll(
		fromResult as ValidInteger,
		toResult as ValidInteger
	) )
}
