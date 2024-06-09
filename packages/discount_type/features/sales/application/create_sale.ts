import { Errors } from 'packages/shared/domain/exceptions/errors'
import { BaseException } from '../../../../shared/domain/exceptions/BaseException'
import { InvalidDateException } from '../../../../shared/domain/exceptions/InvalidDateException'
import { InvalidPercentageException } from '../../../../shared/domain/exceptions/InvalidPercentageException'
import { InvalidUUIDException } from '../../../../shared/domain/exceptions/InvalidUUIDException'
import { UUID } from '../../../../shared/domain/value_objects/uuid'
import { ValidDate } from '../../../../shared/domain/value_objects/valid_date'
import { ValidPercentage } from '../../../../shared/domain/value_objects/valid_percentage'
import {
	wrapType,
	wrapTypeDefault,
	wrapTypeErrors
} from '../../../../shared/utils/wrap_type'
import { DiscountRepository } from '../../../domain/discount_repository'
import { Sale } from '../domain/sale'

export const CreateSale = async ( repo: DiscountRepository,
	props: {
		id?: string,
		product_id: string,
		percentage: number,
		creation_date: Date,
		start_date: Date,
		end_date: Date,
	} ): Promise<Sale | Errors> => {

	const errors: BaseException[] = []

	const idResult = wrapTypeDefault(
		UUID.create(),
		( value ) => UUID.from( value ),
		props.id
	)

	if ( idResult instanceof BaseException ) {
		errors.push( idResult )
	}

	const productIDResult = wrapType<UUID, InvalidUUIDException>(
		() => UUID.from( props.product_id ) )

	if ( productIDResult instanceof BaseException ) {
		errors.push( productIDResult )
	}

	const percentageResult = wrapType<ValidPercentage, InvalidPercentageException>(
		() => ValidPercentage.from( props.percentage ) )

	if ( percentageResult instanceof BaseException ) {
		errors.push( percentageResult )
	}

	const creationDateResult = wrapType<ValidDate, InvalidDateException>(
		() => ValidDate.from( props.creation_date ) )

	if ( creationDateResult instanceof BaseException ) {
		errors.push( creationDateResult )
	}

	const startDateResult = wrapType<ValidDate, InvalidDateException>(
		() => ValidDate.from( props.start_date ) )

	if ( startDateResult instanceof BaseException ) {
		errors.push( startDateResult )
	}

	const endDateResult = wrapType<ValidDate, InvalidDateException>(
		() => ValidDate.from( props.end_date ) )

	if ( endDateResult instanceof BaseException ) {
		errors.push( endDateResult )
	}

	if ( errors.length > 0 ) {
		return new Errors( errors )
	}

	const promotion = new Sale(
		idResult as UUID,
		productIDResult as UUID,
		percentageResult as ValidPercentage,
		creationDateResult as ValidDate,
		startDateResult as ValidDate,
		endDateResult as ValidDate
	)

	const result = await wrapTypeErrors( () => repo.create( promotion ) )

	if ( result instanceof Errors ) {
		return result
	}

	return promotion
}
