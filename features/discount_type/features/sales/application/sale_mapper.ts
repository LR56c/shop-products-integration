import { BaseException } from '../../../../shared/domain/exceptions/BaseException'
import { InvalidDateException } from '../../../../shared/domain/exceptions/InvalidDateException'
import { InvalidPercentageException } from '../../../../shared/domain/exceptions/InvalidPercentageException'
import { InvalidStringException } from '../../../../shared/domain/exceptions/InvalidStringException'
import { InvalidUUIDException } from '../../../../shared/domain/exceptions/InvalidUUIDException'
import { UUID } from '../../../../shared/domain/value_objects/UUID'
import { ValidDate } from '../../../../shared/domain/value_objects/ValidDate'
import { ValidPercentage } from '../../../../shared/domain/value_objects/ValidPercentage'
import { wrapType } from '../../../../shared/utils/WrapType'
import { Sale } from '../domain/sale'

export function saleToJson( sale: Sale ): Record<string, any> {
	return {
		id        : sale.id.value,
		product_id: sale.product_id.value,
		percentage: sale.percentage.value,
		created_at: sale.creation_date.value,
		end_date  : sale.end_date.value,
		start_date: sale.start_date.value
	}
}

export function saleFromJson( json: Record<string, any> ): Sale | BaseException[] {
	const errors: BaseException[] = []

	const id = wrapType<UUID, InvalidUUIDException>(
		() => UUID.from( json.id ) )

	if ( id instanceof BaseException ) {
		errors.push( new InvalidUUIDException() )
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

	const product_id = wrapType<UUID, InvalidUUIDException>(
		() => UUID.from( json.product_id ) )

	if ( product_id instanceof BaseException ) {
		errors.push( new InvalidStringException( 'product_id' ) )
	}

	if ( errors.length > 0 ) {
		return errors
	}

	return new Sale(
		id as UUID,
		product_id as UUID,
		percentage as ValidPercentage,
		creation_date as ValidDate,
		start_date as ValidDate,
		end_date as ValidDate
	)
}
