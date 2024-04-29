import { Product } from '../domain/models/product'
import { ProductRepository } from '../domain/repository/product_repository'
import { InvalidIntegerException } from '../../shared/domain/exceptions/InvalidIntegerException'
import { InvalidStringException } from '../../shared/domain/exceptions/InvalidStringException'
import { ValidInteger } from '../../shared/domain/value_objects/ValidInteger'
import { ValidString } from '../../shared/domain/value_objects/ValidString'
import { wrapType } from '../../shared/utils/WrapType'

export const SearchProductByName = async ( repo: ProductRepository, props: {
	name: string,
	from: string,
	to: string
} ): Promise<Product[]> => {

	const errors: Error[] = []

	const nameResult = wrapType<ValidString, InvalidStringException>(
		() => ValidString.from( props.name ) )

	if ( nameResult instanceof Error ) {
		errors.push( new InvalidStringException( 'name' ) )
	}

	const fromResult = wrapType<ValidInteger, InvalidIntegerException>(
		() => ValidInteger.from( props.from ) )

	if ( fromResult instanceof Error ) {
		errors.push( new InvalidIntegerException( 'from' ) )
	}

	const toResult = wrapType<ValidInteger, InvalidIntegerException>(
		() => ValidInteger.from( props.to ) )

	if ( toResult instanceof Error ) {
		errors.push( new InvalidIntegerException( 'to' ) )
	}

	if ( errors.length > 0 ) {
		throw errors
	}

	return await repo.searchProduct( nameResult as ValidString,
		fromResult as ValidInteger, toResult as ValidInteger )
}
