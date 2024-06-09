import { Errors } from 'packages/shared/domain/exceptions/errors'
import { BaseException } from '../../../../shared/domain/exceptions/BaseException'
import { InvalidDateException } from '../../../../shared/domain/exceptions/InvalidDateException'
import { InvalidIntegerException } from '../../../../shared/domain/exceptions/InvalidIntegerException'
import { InvalidPercentageException } from '../../../../shared/domain/exceptions/InvalidPercentageException'
import { InvalidStringException } from '../../../../shared/domain/exceptions/InvalidStringException'
import { InvalidUUIDException } from '../../../../shared/domain/exceptions/InvalidUUIDException'
import { UUID } from '../../../../shared/domain/value_objects/uuid'
import { ValidDate } from '../../../../shared/domain/value_objects/valid_date'
import { ValidInteger } from '../../../../shared/domain/value_objects/valid_integer'
import { ValidPercentage } from '../../../../shared/domain/value_objects/valid_percentage'
import { ValidString } from '../../../../shared/domain/value_objects/valid_string'
import {
	wrapType,
	wrapTypeDefault,
	wrapTypeErrors
} from '../../../../shared/utils/wrap_type'
import { DiscountRepository } from '../../../domain/discount_repository'
import {
	Promotion,
	PromotionProduct
} from '../domain/promotion'

export const CreatePromotion = async ( repo: DiscountRepository,
	props: {
		id?: string,
		name: string,
		percentage: number,
		creation_date: Date,
		start_date: Date,
		end_date: Date,
		products: {
			quantity: number,
			product_id: string
		}[]
	} ): Promise<Promotion | Errors> => {

	const errors: BaseException[] = []

	const idResult = wrapTypeDefault(
		UUID.create(),
		( value ) => UUID.from( value ),
		props.id
	)

	if ( idResult instanceof BaseException ) {
		errors.push( idResult )
	}

	const nameResult = wrapType<ValidString, InvalidStringException>(
		() => ValidString.from( props.name ) )

	if ( nameResult instanceof BaseException ) {
		errors.push( nameResult )
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

	const products: PromotionProduct[] = []

	for ( const product of props.products ) {
		const quantity = wrapType<ValidInteger, InvalidIntegerException>(
			() => ValidInteger.from( product.quantity ) )

		if ( quantity instanceof BaseException ) {
			errors.push( quantity )
		}

		const product_id = wrapType<UUID, InvalidUUIDException>(
			() => UUID.from( product.product_id ) )

		if ( product_id instanceof BaseException ) {
			errors.push( product_id )
		}

		products.push(
			new PromotionProduct( quantity as ValidPercentage, product_id as UUID ) )
	}

	if ( errors.length > 0 ) {
		return new Errors( errors )
	}

	const promotion = new Promotion(
		idResult as UUID,
		nameResult as ValidString,
		percentageResult as ValidPercentage,
		creationDateResult as ValidDate,
		startDateResult as ValidDate,
		endDateResult as ValidDate,
		products
	)

	const result = await wrapTypeErrors( () => repo.create( promotion ) )

	if ( result instanceof Errors ) {
		return result
	}

	return promotion
}
