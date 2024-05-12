import { DiscountParentProps } from '../../../domain/discount'
import { BaseException } from '../../../../shared/domain/exceptions/BaseException'
import { InvalidStringException } from '../../../../shared/domain/exceptions/InvalidStringException'
import { InvalidUUIDException } from '../../../../shared/domain/exceptions/InvalidUUIDException'
import { UUID } from '../../../../shared/domain/value_objects/UUID'
import { ValidString } from '../../../../shared/domain/value_objects/ValidString'
import { wrapType } from '../../../../shared/utils/WrapType'
import { Sale } from '../domain/sale'

export function saleToJson( sale: Sale ): Record<string, any> {
	return {
		id          : sale.id.value,
		product_code: sale.product_code.value
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

	const product_code = wrapType<ValidString, InvalidStringException>(
		() => ValidString.from( json.product_code ) )

	if ( product_code instanceof BaseException ) {
		errors.push( new InvalidStringException( 'product_code' ) )
	}

	if ( errors.length > 0 ) {
		return errors
	}

	return new Sale(
		id as UUID,
		product_code as ValidString,
		parent.percentage,
		parent.creation_date,
		parent.start_date,
		parent.end_date
	)
}
