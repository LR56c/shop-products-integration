import { SaleDto } from './sale_dto'
import { Sale } from '~features/discount_type/features/sales/domain/sale'
import { BaseException } from '~features/shared/domain/exceptions/BaseException'
import { InvalidDateException } from '~features/shared/domain/exceptions/InvalidDateException'
import { InvalidPercentageException } from '~features/shared/domain/exceptions/InvalidPercentageException'
import { InvalidStringException } from '~features/shared/domain/exceptions/InvalidStringException'
import { InvalidUUIDException } from '~features/shared/domain/exceptions/InvalidUUIDException'
import { UUID } from '~features/shared/domain/value_objects/UUID'
import { ValidDate } from '~features/shared/domain/value_objects/ValidDate'
import { ValidPercentage } from '~features/shared/domain/value_objects/ValidPercentage'
import { ValidString } from '~features/shared/domain/value_objects/ValidString'
import { wrapType } from '~features/shared/utils/WrapType'

export function parseSale( dto: SaleDto ): Sale
{
	const errors: BaseException[] = []

	const id = wrapType<UUID, InvalidUUIDException>(
		() => UUID.from( dto.id ) )
	if ( id instanceof BaseException ) {
		errors.push( new InvalidUUIDException() )
	}

	const product_id = wrapType<UUID, InvalidUUIDException>(
		() => UUID.from( dto.product_id ) )

	if ( product_id instanceof BaseException ) {
		errors.push( new InvalidStringException() )
	}

	const percentage = wrapType<ValidPercentage, InvalidPercentageException>(
		() => ValidPercentage.from( dto.percentage ) )

	if ( percentage instanceof BaseException ) {
		errors.push( new InvalidStringException() )
	}

	const creationDate = wrapType<ValidDate, InvalidDateException>(
		() => ValidDate.from( dto.created_at ) )

	if ( creationDate instanceof BaseException ) {
		errors.push( new InvalidDateException() )
	}

	const endDate = wrapType<ValidDate, InvalidDateException>(
		() => ValidDate.from( dto.end_date ) )

	if ( endDate instanceof BaseException ) {
		errors.push( new InvalidDateException() )
	}

	const startDate = wrapType<ValidDate, InvalidDateException>(
		() => ValidDate.from( dto.start_date ) )

	if ( startDate instanceof BaseException ) {
		errors.push( new InvalidDateException() )
	}

	if ( errors.length > 0 )
	{
		throw errors
	}

	return new Sale(
		id as UUID,
		product_id as UUID,
		percentage as ValidPercentage,
		creationDate as ValidDate,
		startDate as ValidDate,
		endDate as ValidDate,
	)
}
