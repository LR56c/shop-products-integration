import { Errors } from '../../shared/domain/exceptions/errors'
import { categoryFromJson } from '../../categories/application/category_mapper'
import { Category } from '../../categories/domain/category'
import {
	discountFromJson,
	discountToJson
} from '../../discount_type/application/discount_mapper'
import { Discount } from '../../discount_type/domain/discount'
import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { InvalidDateException } from '../../shared/domain/exceptions/InvalidDateException'
import { InvalidIntegerException } from '../../shared/domain/exceptions/InvalidIntegerException'
import { InvalidRankException } from '../../shared/domain/exceptions/InvalidRankException'
import { InvalidStringException } from '../../shared/domain/exceptions/InvalidStringException'
import { InvalidURLException } from '../../shared/domain/exceptions/InvalidURLException'
import { InvalidUUIDException } from '../../shared/domain/exceptions/InvalidUUIDException'
import { UUID } from '../../shared/domain/value_objects/uuid'
import { ValidDate } from '../../shared/domain/value_objects/valid_date'
import { ValidInteger } from '../../shared/domain/value_objects/valid_integer'
import { ValidRank } from '../../shared/domain/value_objects/valid_rank'
import { ValidString } from '../../shared/domain/value_objects/valid_string'
import { ValidURL } from '../../shared/domain/value_objects/valid_url'
import { wrapType } from '../../shared/utils/wrap_type'
import { Product } from '../domain/models/product'
import { ProductResponse } from '../domain/models/product_response'

export function productToJson( product: Product ): Record<string, any> {
	return {
		id          : product.id.value,
		code        : product.code.value,
		product_code: product.product_code.value,
		name        : product.name.value,
		description : product.description.value,
		created_at  : product.created_at.value,
		brand       : product.brand.value,
		price       : product.price.value,
		image_url   : product.image_url.value,
		stock       : product.stock.value,
		average_rank: product.average_rank.value,
		category    : product.category.value,
		discount    : product.discount === undefined ? null : product.discount.value
	}
}

export function productFromJson( json: Record<string, any> ): Product | Errors {
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
		() => ValidRank.from( json.average_rank ) )

	if ( rank instanceof BaseException ) {
		errors.push( new InvalidRankException( 'average_rank' ) )
	}

	const category = wrapType<ValidString, InvalidStringException>(
		() => ValidString.from( json.category ) )

	if ( category instanceof BaseException ) {
		errors.push( new InvalidStringException( 'category' ) )
	}

	let discountResult: UUID | undefined = undefined
	if ( json.discounts !== null ) {
		const discount = wrapType<UUID, InvalidUUIDException>(
			() => UUID.from( json.discounts ) )

		if ( discount instanceof BaseException ) {
			errors.push( new InvalidUUIDException() )
		}
		else {
			discountResult = discount as UUID
		}
	}

	if ( errors.length > 0 ) {
		return new Errors( errors )
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
		category as ValidString,
		discountResult
	)
}

export function productResponseToJson( product: ProductResponse ): Record<string, any> {
	return {
		id          : product.id.value,
		code        : product.code.value,
		product_code: product.product_code.value,
		name        : product.name.value,
		description : product.description.value,
		created_at  : product.created_at.value,
		brand       : product.brand.value,
		price       : product.price.value,
		image_url   : product.image_url.value,
		stock       : product.stock.value,
		average_rank: product.average_rank.value,
		category    : product.category.name.value,
		discount    : product.discount === undefined ? null : discountToJson(
			product.discount )
	}
}

export function productResponseFromJson( json: Record<string, any> ): ProductResponse | BaseException[] {
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
		() => ValidRank.from( json.average_rank ) )

	if ( rank instanceof BaseException ) {
		errors.push( new InvalidRankException( 'average_rank' ) )
	}

	const category = categoryFromJson( json.categories )

	if ( category instanceof BaseException ) {
		errors.push( new InvalidStringException( 'category' ) )
	}

	let discountResult: Discount | undefined = undefined
	if ( json.discounts !== null ) {
		const discount = discountFromJson( json.discounts )
		if ( discount instanceof Errors ) {
			errors.push( ...discount.values )
		}
		else {
			discountResult = discount as Discount
		}
	}

	if ( errors.length > 0 ) {
		return errors
	}

	return new ProductResponse(
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
		category as Category,
		discountResult
	)
}
