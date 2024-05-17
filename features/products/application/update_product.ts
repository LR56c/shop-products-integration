import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { InvalidIntegerException } from '../../shared/domain/exceptions/InvalidIntegerException'
import { InvalidRankException } from '../../shared/domain/exceptions/InvalidRankException'
import { InvalidStringException } from '../../shared/domain/exceptions/InvalidStringException'
import { InvalidURLException } from '../../shared/domain/exceptions/InvalidURLException'
import { InvalidUUIDException } from '../../shared/domain/exceptions/InvalidUUIDException'
import { UUID } from '../../shared/domain/value_objects/UUID'
import { ValidInteger } from '../../shared/domain/value_objects/ValidInteger'
import { ValidRank } from '../../shared/domain/value_objects/ValidRank'
import { ValidString } from '../../shared/domain/value_objects/ValidString'
import { ValidURL } from '../../shared/domain/value_objects/ValidURL'
import { wrapType } from '../../shared/utils/WrapType'
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
	} ): Promise<boolean> => {

	const errors: BaseException[] = []

	const codeResult = props.code !== undefined
		? wrapType<ValidString, InvalidStringException>(
			() => ValidString.from( props.code! ) ) : product.code

	if ( codeResult instanceof BaseException ) {
		errors.push( new InvalidStringException( 'code' ) )
	}

	const code_productResult = props.product_code !== undefined
		? wrapType<ValidString, InvalidStringException>(
			() => ValidString.from( props.product_code! ) )
		: product.product_code

	if ( code_productResult instanceof BaseException ) {
		errors.push( new InvalidStringException( 'code_product' ) )
	}

	const nameResult = props.name !== undefined
		? wrapType<ValidString, InvalidStringException>(
			() => ValidString.from( props.name! ) )
		: product.name

	if ( nameResult instanceof BaseException ) {
		errors.push( new InvalidStringException( 'name' ) )
	}

	const descriptionResult = props.description !== undefined
		? wrapType<ValidString, InvalidStringException>(
			() => ValidString.from( props.description! ) )
		: product.description

	if ( descriptionResult instanceof BaseException ) {
		errors.push( new InvalidStringException( 'description' ) )
	}

	const brandResult = props.brand !== undefined
		? wrapType<ValidString, InvalidStringException>(
			() => ValidString.from( props.brand! ) )
		: product.brand

	if ( brandResult instanceof BaseException ) {
		errors.push( new InvalidStringException( 'brand' ) )
	}

	const priceResult = props.price !== undefined
		? wrapType<ValidInteger, InvalidIntegerException>(
			() => ValidInteger.from( props.price! ) )
		: product.price

	if ( priceResult instanceof BaseException ) {
		errors.push( new InvalidIntegerException( 'price' ) )
	}

	const image_urlResult = props.image_url !== undefined
		? wrapType<ValidURL, InvalidURLException>(
			() => ValidURL.from( props.image_url! ) )
		: product.image_url

	if ( image_urlResult instanceof BaseException ) {
		errors.push( new InvalidURLException( 'image' ) )
	}

	const stockResult = props.stock !== undefined
		? wrapType<ValidInteger, InvalidIntegerException>(
			() => ValidInteger.from( props.stock! ) )
		: product.stock

	if ( stockResult instanceof BaseException ) {
		errors.push( new InvalidIntegerException( 'stock' ) )
	}

	const average_rankResult = props.average_rank !== undefined
		? wrapType<ValidRank, InvalidRankException>(
			() => ValidRank.from( props.average_rank! ) )
		: product.average_rank

	if ( average_rankResult instanceof BaseException ) {
		errors.push( new InvalidRankException( 'rank' ) )
	}

	const category_nameResult = props.category_name !== undefined
		? wrapType<ValidString, InvalidStringException>(
			() => ValidString.from( props.category_name! ) )
		: product.category

	if ( category_nameResult instanceof BaseException ) {
		errors.push( new InvalidStringException( 'category_name' ) )
	}

	const discountResult = props.discount !== undefined
		? wrapType<UUID, InvalidUUIDException>(
			() => UUID.from( props.discount! ) )
		: product.discount

	if ( discountResult instanceof BaseException ) {
		errors.push( new InvalidUUIDException( 'discount' ) )
	}

	if ( errors.length > 0 ) {
		throw errors
	}

	const newProduct = new Product(
		productID,
		codeResult as ValidString,
		code_productResult as ValidString,
		nameResult as ValidString,
		descriptionResult as ValidString,
		product.created_at,
		brandResult as ValidString,
		priceResult as ValidInteger,
		image_urlResult as ValidURL,
		stockResult as ValidInteger,
		average_rankResult as ValidRank,
		category_nameResult as ValidString,
		discountResult as UUID
	)

	await repo.updateProduct( productID, newProduct )
	return true
}
