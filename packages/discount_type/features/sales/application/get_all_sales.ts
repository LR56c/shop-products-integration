import { Errors } from '../../../../shared/domain/exceptions/errors'
import { BaseException } from '../../../../shared/domain/exceptions/BaseException'
import { InvalidIntegerException } from '../../../../shared/domain/exceptions/InvalidIntegerException'
import { ValidDate } from '../../../../shared/domain/value_objects/valid_date'
import { ValidInteger } from '../../../../shared/domain/value_objects/valid_integer'
import {
	wrapType,
	wrapTypeDefault,
	wrapTypeErrors
} from '../../../../shared/utils/wrap_type'
import { Sale } from '../domain/sale'
import { SaleRepository } from '../domain/sale_repository'

export const GetAllSales = async ( repo: SaleRepository,
	props: {
		from: number,
		to: number,
		from_date?: string,
		to_date?: string,
	} ): Promise<Sale[] | Errors> => {
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

	const fromDateResult = wrapTypeDefault(
		undefined,
		( value ) => ValidDate.from( value ),
		props.from_date
	)

	if ( fromDateResult instanceof BaseException ) {
		errors.push( fromDateResult )
	}

	const toDateResult = wrapTypeDefault(
		undefined,
		( value ) => ValidDate.from( value ),
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
			fromDateResult as ValidDate | undefined,
			toDateResult as ValidDate | undefined
		)
	)
}
