import { Errors } from '../../shared/domain/exceptions/errors'
import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { InvalidDateException } from '../../shared/domain/exceptions/InvalidDateException'
import { InvalidPercentageException } from '../../shared/domain/exceptions/InvalidPercentageException'
import { InvalidUUIDException } from '../../shared/domain/exceptions/InvalidUUIDException'
import { UUID } from '../../shared/domain/value_objects/uuid'
import { ValidDate } from '../../shared/domain/value_objects/valid_date'
import { ValidPercentage } from '../../shared/domain/value_objects/valid_percentage'
import { wrapType } from '../../shared/utils/wrap_type'
import { Discount } from '../domain/discount'
import { DiscountType } from '../domain/discount_type'
import { InvalidDiscountTypeException } from '../domain/invalid_discount_type_exception'

export function discountToJson( discount: Discount ): Record<string, any> {
	return {
		id        : discount.id.value,
		type      : discount.type.value,
		percentage: discount.percentage.value,
		created_at: discount.creation_date.value,
		end_date  : discount.end_date.value,
		start_date: discount.start_date.value
	}
}

export function discountFromJson( json: Record<string, any> ): Discount | Errors {
	const errors: BaseException[] = []

	const id = wrapType<UUID, InvalidUUIDException>(
		() => UUID.from( json.id ) )

	if ( id instanceof BaseException ) {
		errors.push( new InvalidUUIDException() )
	}

	const type = wrapType<DiscountType, InvalidDiscountTypeException>(
		() => DiscountType.from( json.type ) )

	if ( type instanceof BaseException ) {
		errors.push( new InvalidDiscountTypeException( 'type' ) )
	}

	const percentage = wrapType<ValidPercentage, InvalidPercentageException>(
		() => ValidPercentage.from( json.percentage ) )

	if ( percentage instanceof BaseException ) {
		errors.push( new InvalidPercentageException( 'percentage' ) )
	}

	const creation_date = wrapType<ValidDate, InvalidDateException>(
		() => ValidDate.from( json.created_at ) )

	if ( creation_date instanceof BaseException ) {
		errors.push( new InvalidDateException( 'created_at' ) )
	}

	const start_date = wrapType<ValidDate, InvalidDateException>(
		() => ValidDate.from( json.start_date ) )

	if ( start_date instanceof BaseException ) {
		errors.push( new InvalidDateException( 'start_date' ) )
	}

	const end_date = wrapType<ValidDate, InvalidDateException>(
		() => ValidDate.from( json.end_date ) )

	if ( end_date instanceof BaseException ) {
		errors.push( new InvalidDateException( 'end_date' ) )
	}

	if ( type instanceof BaseException || errors.length > 0 ) {
		return new Errors( errors )
	}

	return new Discount(
		id as UUID,
		type as DiscountType,
		percentage as ValidPercentage,
		creation_date as ValidDate,
		start_date as ValidDate,
		end_date as ValidDate
	)
}
