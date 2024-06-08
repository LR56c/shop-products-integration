import { Errors } from '../../shared/domain/exceptions/errors'
import { UUID } from '../../shared/domain/value_objects/uuid'
import { ValidInteger } from '../../shared/domain/value_objects/valid_integer'
import { ValidRank } from '../../shared/domain/value_objects/valid_rank'
import { ValidString } from '../../shared/domain/value_objects/valid_string'
import { ValidURL } from '../../shared/domain/value_objects/valid_url'
import {
	wrapTypeDefault,
	wrapTypeErrors
} from '../../shared/utils/wrap_type'
import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { InvalidIntegerException } from '../../shared/domain/exceptions/InvalidIntegerException'
import { InvalidRankException } from '../../shared/domain/exceptions/InvalidRankException'
import { InvalidStringException } from '../../shared/domain/exceptions/InvalidStringException'
import { InvalidURLException } from '../../shared/domain/exceptions/InvalidURLException'
import { InvalidUUIDException } from '../../shared/domain/exceptions/InvalidUUIDException'
import { Product } from '../domain/models/product'
import { ProductResponse } from '../domain/models/product_response'
import { ProductRepository } from '../domain/repository/product_repository'

export const UpdateProduct = async (
	repo: ProductRepository,
	productID: UUID,
	product: ProductResponse,
	props: {
		code?: string,
		product_code?: string,
		name?: string,
		description?: string,
		brand?: string,
		price?: number,
		image_url?: string,
		stock?: number,
		average_rank?: number,
		category_name?: string,
		discount?: string,
	} ): Promise<boolean | Errors> => {

	const errors: BaseException[] = []

	const codeResult = wrapTypeDefault(
		product.code,
		( value ) => ValidString.from( value ),
		props.code
	)

	if ( codeResult instanceof BaseException ) {
		errors.push( new InvalidStringException( 'code' ) )
	}

	const codeProductResult = wrapTypeDefault(
		product.product_code,
		( value ) => ValidString.from( value ),
		props.product_code
	)

	if ( codeProductResult instanceof BaseException ) {
		errors.push( new InvalidStringException( 'code_product' ) )
	}

	const nameResult = wrapTypeDefault(
		product.name,
		( value ) => ValidString.from( value ),
		props.name
	)

	if ( nameResult instanceof BaseException ) {
		errors.push( new InvalidStringException( 'name' ) )
	}

	const descriptionResult = wrapTypeDefault(
		product.description,
		( value ) => ValidString.from( value ),
		props.description
	)

	if ( descriptionResult instanceof BaseException ) {
		errors.push( new InvalidStringException( 'description' ) )
	}

	const brandResult = wrapTypeDefault(
		product.brand,
		( value ) => ValidString.from( value ),
		props.brand
	)

	if ( brandResult instanceof BaseException ) {
		errors.push( new InvalidStringException( 'brand' ) )
	}

	const priceResult = wrapTypeDefault(
		product.price,
		( value ) => ValidInteger.from( value ),
		props.price
	)

	if ( priceResult instanceof BaseException ) {
		errors.push( new InvalidIntegerException( 'price' ) )
	}

	const imageUrlResult = wrapTypeDefault(
		product.image_url,
		( value ) => ValidURL.from( value ),
		props.image_url
	)

	if ( imageUrlResult instanceof BaseException ) {
		errors.push( new InvalidURLException( 'image' ) )
	}

	const stockResult = wrapTypeDefault(
		product.stock,
		( value ) => ValidInteger.from( value ),
		props.stock
	)

	if ( stockResult instanceof BaseException ) {
		errors.push( new InvalidIntegerException( 'stock' ) )
	}

	const averageRankResult = wrapTypeDefault(
		product.average_rank,
		( value ) => ValidRank.from( value ),
		props.average_rank
	)

	if ( averageRankResult instanceof BaseException ) {
		errors.push( new InvalidRankException( 'rank' ) )
	}

	const categoryNameResult = wrapTypeDefault(
		product.category.name,
		( value ) => ValidString.from( value ),
		props.category_name
	)

	if ( categoryNameResult instanceof BaseException ) {
		errors.push( new InvalidStringException( 'category_name' ) )
	}


	const discountResult = wrapTypeDefault(
		product.discount?.id ?? undefined,
		( value ) => UUID.from( value ),
		props.discount)

	if ( discountResult instanceof BaseException ) {
		errors.push( new InvalidUUIDException( 'discount' ) )
	}

	if ( errors.length > 0 ) {
		return new Errors( errors )
	}

	const newProduct = new Product(
		productID,
		codeResult as ValidString,
		codeProductResult as ValidString,
		nameResult as ValidString,
		descriptionResult as ValidString,
		product.created_at,
		brandResult as ValidString,
		priceResult as ValidInteger,
		imageUrlResult as ValidURL,
		stockResult as ValidInteger,
		averageRankResult as ValidRank,
		categoryNameResult as ValidString,
		discountResult as UUID | undefined
	)

	return await wrapTypeErrors( () => repo.updateProduct( productID, newProduct ) )
}
