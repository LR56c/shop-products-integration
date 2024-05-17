import { BaseException } from '../../../../shared/domain/exceptions/BaseException'
import { InvalidDateException } from '../../../../shared/domain/exceptions/InvalidDateException'
import { InvalidIntegerException } from '../../../../shared/domain/exceptions/InvalidIntegerException'
import { ValidDate } from '../../../../shared/domain/value_objects/ValidDate'
import { ValidInteger } from '../../../../shared/domain/value_objects/ValidInteger'
import { wrapType } from '../../../../shared/utils/WrapType'
import { Sale } from '../domain/sale'
import { SaleRepository } from '../domain/sale_repository'

export const GetAllSales = async ( repo: SaleRepository,
	props: {
		from: number,
		to: number,
		from_date?: Date,
		to_date?: Date,
	} ): Promise<Sale[]> => {
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

	const fromDateResult = props.from_date === undefined
		? undefined
		: wrapType<ValidDate, InvalidDateException>(
			() => ValidDate.from( props.from_date ) )

	if ( fromDateResult instanceof BaseException ) {
		errors.push( fromDateResult )
	}

	const toDateResult = props.to_date === undefined
		? undefined
		: wrapType<ValidDate, InvalidDateException>(
			() => ValidDate.from( props.to_date ) )

	if ( toDateResult instanceof BaseException ) {
		errors.push( toDateResult )
	}

	if ( errors.length > 0 ) {
		throw errors
	}

	return repo.getAll(
		fromResult as ValidInteger,
		toResult as ValidInteger,
		fromDateResult as ValidDate,
		toDateResult as ValidDate
	)
}
