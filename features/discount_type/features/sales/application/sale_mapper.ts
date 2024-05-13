import { DiscountParentProps } from '../../../domain/discount'
import { BaseException } from '../../../../shared/domain/exceptions/BaseException'
import { InvalidStringException } from '../../../../shared/domain/exceptions/InvalidStringException'
import { InvalidUUIDException } from '../../../../shared/domain/exceptions/InvalidUUIDException'
import { UUID } from '../../../../shared/domain/value_objects/UUID'
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

export function saleFromJson( parent: DiscountParentProps,
	json: Record<string, any> ): Sale | BaseException[] {
	const errors: BaseException[] = []

	const id = wrapType<UUID, InvalidUUIDException>(
		() => UUID.from( json.id ) )

	if ( id instanceof BaseException ) {
		errors.push( new InvalidUUIDException() )
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
		parent.percentage,
		parent.creation_date,
		parent.start_date,
		parent.end_date
	)
}
