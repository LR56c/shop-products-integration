import { ProductRepository } from '../domain/repository/product_repository'
import { InvalidStringException } from '../../shared/domain/exceptions/InvalidStringException'
import { ValidString } from '../../shared/domain/value_objects/ValidString'
import { wrapType } from '../../shared/utils/WrapType'
import { ValidInteger } from '../../shared/domain/value_objects/ValidInteger'
import { UUID } from '../../shared/domain/value_objects/UUID'
import { ValidDate } from '../../shared/domain/value_objects/ValidDate'
import { InvalidDateException } from '../../shared/domain/exceptions/InvalidDateException'
import { InvalidIntegerException } from '../../shared/domain/exceptions/InvalidIntegerException'
import { ValidURL } from '../../shared/domain/value_objects/ValidURL'
import { InvalidURLException } from '../../shared/domain/exceptions/InvalidURLException'
import { ValidRank } from '../domain/models/ValidRank'
import { InvalidRankException } from '../domain/exceptions/InvalidRankException'
import { Product } from '../domain/models/Product'

export const CreateProduct = async ( repo: ProductRepository, props: {
    id : string
    code: string
    name: string
    description: string
    create_at: string
    brand: string
    image_url: string
    rank: string
    price: string
    stock: string
    category_name: string
} ): Promise<boolean> => {

    const errors: Error[] = []

	const codeResult = wrapType<ValidString, InvalidStringException>(
		() => ValidString.from( props.code ) )

	if ( codeResult instanceof Error ) {
		errors.push( new InvalidStringException('code') )
	}

	const nameResult = wrapType<ValidString, InvalidStringException>(
		() => ValidString.from( props.name ) )

	if ( nameResult instanceof Error ) {
		errors.push( new InvalidStringException('name') )
	}

	const descriptionResult = wrapType<ValidString, InvalidStringException>(
		() => ValidString.from( props.description ) )

	if ( descriptionResult instanceof Error ) {
		errors.push( new InvalidStringException('description') )
	}

	const create_atResult = wrapType<ValidDate, InvalidDateException>(
		() => ValidDate.from( props.create_at ) )

	if ( create_atResult instanceof Error ) {
		errors.push( new InvalidDateException('create_at') )
	}

	const brandResult = wrapType<ValidString, InvalidStringException>(
		() => ValidString.from( props.brand ) )

	if ( brandResult instanceof Error ) {
		errors.push( new InvalidStringException('brand') )
	}

	const priceResult = wrapType<ValidInteger, InvalidIntegerException>(
		() => ValidInteger.from( props.price ) )

	if ( priceResult instanceof Error ) {
		errors.push( new InvalidIntegerException('price') )
	}

	const image_urlResult = wrapType<ValidURL, InvalidURLException>(
		() => ValidURL.from( props.image_url ) )

	if ( image_urlResult instanceof Error ) {
		errors.push( new InvalidURLException('image') )
	}

	const stockResult = wrapType<ValidInteger, InvalidIntegerException>(
		() => ValidInteger.from( props.stock ) )

	if ( stockResult instanceof Error ) {
		errors.push( new InvalidIntegerException('stock') )
	}

	const rankResult = wrapType<ValidRank, InvalidRankException>(
		() => ValidRank.from( props.rank ) )

	if ( rankResult instanceof Error ) {
		errors.push( new InvalidRankException('rank') )
	}

	const category_nameResult = wrapType<ValidString, InvalidStringException>(
		() => ValidString.from( props.category_name ) )

	if ( category_nameResult instanceof Error ) {
		errors.push( new InvalidStringException('category') )
	}
    

    if ( errors.length > 0 ) {
        throw errors
    }
	const product = new Product(
		UUID.from( props.id ),
		codeResult as ValidString,
		nameResult as ValidString,
		descriptionResult as ValidString,
		create_atResult as ValidDate,
		brandResult as ValidString,
		priceResult as ValidInteger,
		image_urlResult as ValidURL,
		rankResult as ValidRank,
		stockResult as ValidInteger,
		category_nameResult as ValidString
	)
    return await repo.createProduct( product as Product )
}