import { Errors } from 'packages/shared/domain/exceptions/errors'
import { BaseException } from '../../../../shared/domain/exceptions/BaseException'
import { InvalidIntegerException } from '../../../../shared/domain/exceptions/InvalidIntegerException'
import { ValidDate } from '../../../../shared/domain/value_objects/valid_date'
import { ValidInteger } from '../../../../shared/domain/value_objects/valid_integer'
import { ValidString } from '../../../../shared/domain/value_objects/valid_string'
import {
	wrapType,
	wrapTypeDefault,
	wrapTypeErrors
} from '../../../../shared/utils/wrap_type'
import { PromotionRepository } from '../domain/promotion_repository'
import { PromotionResponse } from '../domain/promotion_response'

export const GetAllPromotions = async ( repo: PromotionRepository,
	props: {
		from: number,
		to: number,
		name?: string,
		from_date?: string,
		to_date?: string,
	} ): Promise<PromotionResponse[] | Errors> => {
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

	const nameResult = wrapTypeDefault(
		undefined,
		( value ) => ValidString.from( value ),
		props.name
	)

	if ( nameResult instanceof BaseException ) {
		errors.push( nameResult )
	}

	const fromDateResult = wrapTypeDefault(
		undefined,
		( value ) => ValidDate.from( new Date( value ) ),
		props.from_date
	)

	if ( fromDateResult instanceof BaseException ) {
		errors.push( fromDateResult )
	}

	const toDateResult = wrapTypeDefault(
		undefined,
		( value ) => ValidDate.from( new Date( value ) ),
		props.to_date
	)

	if ( toDateResult instanceof BaseException ) {
		errors.push( toDateResult )
	}

	if ( errors.length > 0 ) {
		return new Errors( errors )
	}

	return await wrapTypeErrors( () => repo.getAll(
		fromResult as ValidInteger,
		toResult as ValidInteger,
		nameResult as ValidString,
		fromDateResult as ValidDate,
		toDateResult as ValidDate
	) )
}
