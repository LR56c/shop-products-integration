import { PromotionRepository } from '../domain/promotion_repository'
import { PromotionResponse } from '../domain/promotion_response'
import { InvalidStringException } from '../../../../shared/domain/exceptions/InvalidStringException'
import { ValidString } from '../../../../shared/domain/value_objects/ValidString'
import { BaseException } from '../../../../shared/domain/exceptions/BaseException'
import { InvalidDateException } from '../../../../shared/domain/exceptions/InvalidDateException'
import { InvalidIntegerException } from '../../../../shared/domain/exceptions/InvalidIntegerException'
import { ValidDate } from '../../../../shared/domain/value_objects/ValidDate'
import { ValidInteger } from '../../../../shared/domain/value_objects/ValidInteger'
import { wrapType } from '../../../../shared/utils/WrapType'

export const GetAllPromotions = async ( repo: PromotionRepository,
	props: {
		from: number,
		to: number,
		name?: string,
		from_date?: string,
		to_date?: string,
	} ): Promise<PromotionResponse[]> => {
	const errors : BaseException[] = []

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

	const nameResult = props.name === undefined ? undefined : wrapType<ValidString, InvalidStringException>(
		() => ValidString.from( props.name! ) )

	if ( nameResult instanceof BaseException ) {
		errors.push( nameResult )
	}

	const fromDateResult = props.from_date === undefined ? undefined : wrapType<ValidDate, InvalidDateException>(
		() => ValidDate.from( new Date(props.from_date!) ) )

	if ( fromDateResult instanceof BaseException ) {
		errors.push( fromDateResult )
	}

	const toDateResult = props.to_date === undefined ? undefined : wrapType<ValidDate, InvalidDateException>(
		() => ValidDate.from( new Date(props.to_date!) ) )

	if ( toDateResult instanceof BaseException ) {
		errors.push( toDateResult )
	}

	if ( errors.length > 0 ) {
		throw errors
	}

	return repo.getAll(
		fromResult as ValidInteger,
		toResult as ValidInteger,
		nameResult as ValidString,
		fromDateResult as ValidDate,
		toDateResult as ValidDate
	)
}