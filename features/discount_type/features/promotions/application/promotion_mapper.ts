import {
	productFromJson,
	productToJson
} from '../../../../products/application/product_mapper'
import { Product } from '../../../../products/domain/models/product'
import { DiscountParentProps } from '../../../domain/discount'
import { BaseException } from '../../../../shared/domain/exceptions/BaseException'
import { InvalidStringException } from '../../../../shared/domain/exceptions/InvalidStringException'
import { InvalidUUIDException } from '../../../../shared/domain/exceptions/InvalidUUIDException'
import { UUID } from '../../../../shared/domain/value_objects/UUID'
import { ValidString } from '../../../../shared/domain/value_objects/ValidString'
import { wrapType } from '../../../../shared/utils/WrapType'
import { Promotion } from '../domain/promotion'

export function promotionToJson( promotion: Promotion ): Record<string, any> {
	return {
		id        : promotion.id.value,
		name      : promotion.name.value,
		percentage: promotion.percentage.value,
		created_at: promotion.creation_date.value,
		end_date  : promotion.end_date.value,
		start_date: promotion.start_date.value,
		products  : promotion.products.map( product => productToJson( product ) )
	}
}

export function promotionFromJson( parent: DiscountParentProps,
	json: Record<string, any> ): Promotion | BaseException[] {
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

	const products : Product[] = []

	if ( json.products !== undefined ) {
		for ( const product of json.products ) {
			const p = productFromJson( product )
			if ( p instanceof BaseException ) {
				errors.push( p )
				break
			}
				products.push( p as Product)
		}
	}

	if ( errors.length > 0 ) {
		return errors
	}

	return new Promotion(
		id as UUID,
		name as ValidString,
		parent.percentage,
		parent.creation_date,
		parent.end_date,
		parent.start_date,
		products
	)
}