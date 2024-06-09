import { Errors } from '../../shared/domain/exceptions/errors'
import { UUID } from '../../shared/domain/value_objects/uuid'
import { ValidDate } from '../../shared/domain/value_objects/valid_date'
import { ValidInteger } from '../../shared/domain/value_objects/valid_integer'
import { ValidRank } from '../../shared/domain/value_objects/valid_rank'
import { ValidString } from '../../shared/domain/value_objects/valid_string'
import { ValidURL } from '../../shared/domain/value_objects/valid_url'
import {
	wrapType,
	wrapTypeErrors
} from '../../shared/utils/wrap_type'
import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { InvalidDateException } from '../../shared/domain/exceptions/InvalidDateException'
import { InvalidIntegerException } from '../../shared/domain/exceptions/InvalidIntegerException'
import { InvalidRankException } from '../../shared/domain/exceptions/InvalidRankException'
import { InvalidStringException } from '../../shared/domain/exceptions/InvalidStringException'
import { InvalidURLException } from '../../shared/domain/exceptions/InvalidURLException'
import { InvalidUUIDException } from '../../shared/domain/exceptions/InvalidUUIDException'
import { Product } from '../domain/models/product'
import { ProductRepository } from '../domain/repository/product_repository'

export const CreateProduct = async (
	repo: ProductRepository,
	props: {
		id?: string
		code: string
		product_code: string
		name: string
		description: string
		brand: string
		image_url: string
		price: number
		stock: number
		category_name: string
	} ): Promise<boolean | Errors> => {

	const errors: BaseException[] = []

	const idResult = props.id === undefined
		? UUID.create()
		: wrapType<UUID, InvalidUUIDException>(
			() => UUID.from( props.id! ) )

	if ( idResult instanceof BaseException ) {
		errors.push( idResult )
	}

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

	const categoryResult = wrapType<ValidString, InvalidStringException>(
		() => ValidString.from( props.category_name ) )

	if ( categoryResult instanceof BaseException ) {
		errors.push( new InvalidStringException( 'category' ) )
	}


	if ( errors.length > 0 ) {
		return new Errors( errors )
	}

	const p = new Product(
		idResult as UUID,
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
		categoryResult as ValidString
	)

	return await wrapTypeErrors( () => repo.createProduct( p ) )
}
