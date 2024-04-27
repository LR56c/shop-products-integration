import { InvalidDateException } from '../../shared/domain/exceptions/InvalidDateException'
import { InvalidDecimalException } from '../../shared/domain/exceptions/InvalidDecimalException'
import { InvalidIntegerException } from '../../shared/domain/exceptions/InvalidIntegerException'
import { InvalidStringException } from '../../shared/domain/exceptions/InvalidStringException'
import { InvalidURLException } from '../../shared/domain/exceptions/InvalidURLException'
import { InvalidUUIDException } from '../../shared/domain/exceptions/InvalidUUIDException'
import { UUID } from '../../shared/domain/value_objects/UUID'
import { ValidDate } from '../../shared/domain/value_objects/ValidDate'
import { ValidDecimal } from '../../shared/domain/value_objects/ValidDecimal'
import { ValidInteger } from '../../shared/domain/value_objects/ValidInteger'
import { ValidString } from '../../shared/domain/value_objects/ValidString'
import { ValidURL } from '../../shared/domain/value_objects/ValidURL'
import { wrapType } from '../../shared/utils/WrapType'
import { Product } from '../domain/models/product'

export function productToJson( product: Product ): Record<string, any> {
	return {
		id           : product.id.value,
		code         : product.code.value,
		name         : product.name.value,
		description  : product.description.value,
		create_at    : product.create_at.value,
		brand        : product.brand.value,
		price        : product.price.value,
		image_url    : product.image_url.value,
		stock        : product.stock.value,
		rank         : product.rank.value,
		category_name: product.category_name.value
	}
}

export function productFromJson( json: Record<string, any> ): Product | Error[] {
	const errors: Error[] = []

	const id = wrapType<UUID, InvalidUUIDException>(
		() => UUID.from( json.id ) )

	if ( id instanceof Error ) {
		errors.push( id )
	}

	const code = wrapType<ValidString, InvalidStringException>(
		() => ValidString.from( json.code ) )

	if ( code instanceof Error ) {
		errors.push( code )
	}

	const name = wrapType<ValidString, InvalidStringException>(
		() => ValidString.from( json.name ) )

	if ( name instanceof Error ) {
		errors.push( name )
	}

	const description = wrapType<ValidString, InvalidStringException>(
		() => ValidString.from( json.description ) )

	if ( description instanceof Error ) {
		errors.push( description )
	}

	const create_at = wrapType<ValidDate, InvalidDateException>(
		() => ValidDate.from( json.create_at ) )

	if ( create_at instanceof Error ) {
		errors.push( create_at )
	}

	const brand = wrapType<ValidString, InvalidStringException>(
		() => ValidString.from( json.brand ) )

	if ( brand instanceof Error ) {
		errors.push( brand )
	}

	const price = wrapType<ValidInteger, InvalidIntegerException>(
		() => ValidInteger.from( json.price ) )

	if ( price instanceof Error ) {
		errors.push( price )
	}

	const image_url = wrapType<ValidURL, InvalidURLException>(
		() => ValidURL.from( json.image_url ) )

	if ( image_url instanceof Error ) {
		errors.push( image_url )
	}

	const stock = wrapType<ValidInteger, InvalidIntegerException>(
		() => ValidInteger.from( json.stock ) )

	if ( stock instanceof Error ) {
		errors.push( stock )
	}

	const rank = wrapType<ValidDecimal, InvalidDecimalException>(
		() => ValidDecimal.from( json.rank ) )

	if ( rank instanceof Error ) {
		errors.push( rank )
	}

	const category_name = wrapType<ValidString, InvalidStringException>(
		() => ValidString.from( json.category_name ) )

	if ( category_name instanceof Error ) {
		errors.push( category_name )
	}

	if ( errors.length > 0 ) {
		throw errors
	}

	return new Product(
		id as UUID,
		code as ValidString,
		name as ValidString,
		description as ValidString,
		create_at as ValidDate,
		brand as ValidString,
		price as ValidInteger,
		image_url as ValidURL,
		stock as ValidInteger,
		rank as ValidDecimal,
		category_name as ValidString
	)
}
