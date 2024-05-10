import {
	InvalidPercentageException,
	ValidPercentage
} from '../../sales/domain/ValidPercentage'
import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { InvalidDateException } from '../../shared/domain/exceptions/InvalidDateException'
import { InvalidStringException } from '../../shared/domain/exceptions/InvalidStringException'
import { ValidDate } from '../../shared/domain/value_objects/ValidDate'
import { ValidString } from '../../shared/domain/value_objects/ValidString'
import { wrapType } from '../../shared/utils/WrapType'
import { Promotion } from '../domain/promotion'
import { InvalidUUIDException } from '../../shared/domain/exceptions/InvalidUUIDException'
import { UUID } from '../../shared/domain/value_objects/UUID'

export function promotionToJson( promotion: Promotion ): Record<string, any> {
	return {
		id           : promotion.id.value,
		name         : promotion.name.value,
		percentage   : promotion.percentage.value,
		creation_date: promotion.creation_date.value,
		end_date     : promotion.end_date.value,
		start_date   : promotion.start_date.value
	}
}

export function promotionFromJson( json: Record<string, any> ): Promotion | BaseException[] {
	const errors: BaseException[] = []

	const id = wrapType<UUID, InvalidUUIDException>(
		() => UUID.from( json.id ) )

	if ( id instanceof BaseException ) {
		errors.push( new InvalidUUIDException() )
	}

	const name = wrapType<ValidString, InvalidStringException>(
		() => ValidString.from( json.name ) )

	if ( name instanceof BaseException ) {
		errors.push( new InvalidStringException( 'name' ) )
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

	const end_date = wrapType<ValidDate, InvalidDateException>(
		() => ValidDate.from( json.end_date ) )

	if ( end_date instanceof BaseException ) {
		errors.push( new InvalidDateException( 'end_date' ) )
	}

	const start_date = wrapType<ValidDate, InvalidDateException>(
		() => ValidDate.from( json.start_date ) )

	if ( start_date instanceof BaseException ) {
		errors.push( new InvalidDateException( 'start_date' ) )
	}

	if ( errors.length > 0 ) {
		return errors
	}

	return new Promotion(
		id as UUID,
		name as ValidString,
		percentage as ValidPercentage,
		creation_date as ValidDate,
		end_date as ValidDate,
		start_date as ValidDate
	)
}
