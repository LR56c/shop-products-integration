import { ProductRepository } from 'features/products/domain/repository/product_repository'
import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { InvalidDateException } from '../../shared/domain/exceptions/InvalidDateException'
import { InvalidIntegerException } from '../../shared/domain/exceptions/InvalidIntegerException'
import { InvalidRankException } from '../../shared/domain/exceptions/InvalidRankException'
import { InvalidStringException } from '../../shared/domain/exceptions/InvalidStringException'
import { InvalidURLException } from '../../shared/domain/exceptions/InvalidURLException'
import { UUID } from '../../shared/domain/value_objects/UUID'
import { ValidDate } from '../../shared/domain/value_objects/ValidDate'
import { ValidInteger } from '../../shared/domain/value_objects/ValidInteger'
import { ValidRank } from '../../shared/domain/value_objects/ValidRank'
import { ValidString } from '../../shared/domain/value_objects/ValidString'
import { ValidURL } from '../../shared/domain/value_objects/ValidURL'
import { wrapType } from '../../shared/utils/WrapType'
import { Product } from '../domain/models/product'

export const CreateProduct = async (
	repo : ProductRepository,
	props: {
	code: string
	product_code: string
	name: string
	description: string
	brand: string
	image_url: string
	price: number
	stock: number
	category_name: string
} ): Promise<boolean> => {

	const errors: BaseException[] = []

	const codeResult = wrapType<ValidString, InvalidStringException>(
		() => ValidString.from( props.code ) )

	if ( codeResult instanceof BaseException ) {
		errors.push( new InvalidStringException( 'code' ) )
	}

	const code_productResult = wrapType<ValidString, InvalidStringException>(
		() => ValidString.from( props.product_code ) )

	if ( code_productResult instanceof BaseException ) {
		errors.push( new InvalidStringException( 'code_product' ) )
	}

	const nameResult = wrapType<ValidString, InvalidStringException>(
		() => ValidString.from( props.name ) )

	if ( nameResult instanceof BaseException ) {
		errors.push( new InvalidStringException( 'name' ) )
	}

	const descriptionResult = wrapType<ValidString, InvalidStringException>(
		() => ValidString.from( props.description ) )

	if ( descriptionResult instanceof BaseException ) {
		errors.push( new InvalidStringException( 'description' ) )
	}

	const create_atResult = wrapType<ValidDate, InvalidDateException>(
		() => ValidDate.from( new Date() ) )

	if ( create_atResult instanceof BaseException ) {
		errors.push( new InvalidDateException( 'created_at' ) )
	}

	const brandResult = wrapType<ValidString, InvalidStringException>(
		() => ValidString.from( props.brand ) )

	if ( brandResult instanceof BaseException ) {
		errors.push( new InvalidStringException( 'brand' ) )
	}

	const priceResult = wrapType<ValidInteger, InvalidIntegerException>(
		() => ValidInteger.from( props.price ) )

	if ( priceResult instanceof BaseException ) {
		errors.push( new InvalidIntegerException( 'price' ) )
	}

	const image_urlResult = wrapType<ValidURL, InvalidURLException>(
		() => ValidURL.from( props.image_url ) )

	if ( image_urlResult instanceof BaseException ) {
		errors.push( new InvalidURLException( 'image' ) )
	}

	const stockResult = wrapType<ValidInteger, InvalidIntegerException>(
		() => ValidInteger.from( props.stock ) )

	if ( stockResult instanceof BaseException ) {
		errors.push( new InvalidIntegerException( 'stock' ) )
	}

	const rankResult = wrapType<ValidRank, InvalidRankException>(
		() => ValidRank.from( 0 ) )

	if ( rankResult instanceof BaseException ) {
		errors.push( new InvalidRankException( 'rank' ) )
	}

	const category_nameResult = wrapType<ValidString, InvalidStringException>(
		() => ValidString.from( props.category_name ) )

	if ( category_nameResult instanceof BaseException ) {
		errors.push( new InvalidStringException( 'category' ) )
	}


	if ( errors.length > 0 ) {
		throw errors
	}

	const p = new Product(
		UUID.create(),
		codeResult as ValidString,
		code_productResult as ValidString,
		nameResult as ValidString,
		descriptionResult as ValidString,
		create_atResult as ValidDate,
		brandResult as ValidString,
		priceResult as ValidInteger,
		image_urlResult as ValidURL,
		stockResult as ValidInteger,
		rankResult as ValidRank,
		category_nameResult as ValidString
	)

	await repo.createProduct( p )
	return true
}
