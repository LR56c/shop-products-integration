import { InvalidRankException } from '../domain/exceptions/InvalidRankException'
import { ValidRank } from '../domain/models/ValidRank'
import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { InvalidDateException } from '../../shared/domain/exceptions/InvalidDateException'
import { InvalidIntegerException } from '../../shared/domain/exceptions/InvalidIntegerException'
import { InvalidStringException } from '../../shared/domain/exceptions/InvalidStringException'
import { InvalidURLException } from '../../shared/domain/exceptions/InvalidURLException'
import { InvalidUUIDException } from '../../shared/domain/exceptions/InvalidUUIDException'
import { UUID } from '../../shared/domain/value_objects/UUID'
import { ValidDate } from '../../shared/domain/value_objects/ValidDate'
import { ValidInteger } from '../../shared/domain/value_objects/ValidInteger'
import { ValidString } from '../../shared/domain/value_objects/ValidString'
import { ValidURL } from '../../shared/domain/value_objects/ValidURL'
import { wrapType } from '../../shared/utils/WrapType'
import { Product } from '../domain/models/product'

export function productToJson( product: Product ): Record<string, any> {
	return {
		id          : product.id.value,
		code        : product.code.value,
		product_code: product.product_code.value,
		name        : product.name.value,
		description : product.description.value,
		created_at   : product.created_at.value,
		brand       : product.brand.value,
		price       : product.price.value,
		image_url   : product.image_url.value,
		stock       : product.stock.value,
		rank        : product.rank.value,
		category    : product.category_name.value
	}
}

export function productFromJson( json: Record<string, any> ): Product | BaseException[] {
	const errors: BaseException[] = []

	const id = wrapType<UUID, InvalidUUIDException>(
		() => UUID.from( json.id ) )

	if ( id instanceof BaseException ) {
		errors.push( new InvalidUUIDException() )
	}

	const code = wrapType<ValidString, InvalidStringException>(
		() => ValidString.from( json.code ) )

	if ( code instanceof BaseException ) {
		errors.push( new InvalidStringException( 'code' ) )
	}

	const product_code = wrapType<ValidString, InvalidStringException>(
		() => ValidString.from( json.product_code ) )

	if ( product_code instanceof BaseException ) {
		errors.push( new InvalidStringException( 'product_code' ) )
	}

	const name = wrapType<ValidString, InvalidStringException>(
		() => ValidString.from( json.name ) )

	if ( name instanceof BaseException ) {
		errors.push( new InvalidStringException( 'name' ) )
	}

	const description = wrapType<ValidString, InvalidStringException>(
		() => ValidString.from( json.description ) )

	if ( description instanceof BaseException ) {
		errors.push( new InvalidStringException( 'description' ) )
	}

	const create_at = wrapType<ValidDate, InvalidDateException>(
		() => ValidDate.from( json.created_at ) )

	if ( create_at instanceof BaseException ) {
		errors.push( new InvalidDateException( 'created_at' ) )
	}

	const brand = wrapType<ValidString, InvalidStringException>(
		() => ValidString.from( json.brand ) )

	if ( brand instanceof BaseException ) {
		errors.push( new InvalidStringException( 'brand' ) )
	}

	const price = wrapType<ValidInteger, InvalidIntegerException>(
		() => ValidInteger.from( json.price ) )

	if ( price instanceof BaseException ) {
		errors.push( new InvalidIntegerException( 'price' ) )
	}

	const image_url = wrapType<ValidURL, InvalidURLException>(
		() => ValidURL.from( json.image_url ) )

	if ( image_url instanceof BaseException ) {
		errors.push( new InvalidURLException( 'image' ) )
	}

	const stock = wrapType<ValidInteger, InvalidIntegerException>(
		() => ValidInteger.from( json.stock ) )

	if ( stock instanceof BaseException ) {
		errors.push( new InvalidIntegerException( 'stock' ) )
	}

	const rank = wrapType<ValidRank, InvalidRankException>(
		() => ValidRank.from( json.rank ) )

	if ( rank instanceof BaseException ) {
		errors.push( new InvalidRankException() )
	}

	const category_name = wrapType<ValidString, InvalidStringException>(
		() => ValidString.from( json.category ) )

	if ( category_name instanceof BaseException ) {
		errors.push( new InvalidStringException( 'category' ) )
	}

	if ( errors.length > 0 ) {
		throw errors
	}

	return new Product(
		id as UUID,
		code as ValidString,
		product_code as ValidString,
		name as ValidString,
		description as ValidString,
		create_at as ValidDate,
		brand as ValidString,
		price as ValidInteger,
		image_url as ValidURL,
		stock as ValidInteger,
		rank as ValidRank,
		category_name as ValidString
	)
}
