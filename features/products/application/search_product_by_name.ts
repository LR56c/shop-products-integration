import { Product } from 'features/products/domain/models/product'
import { ProductRepository } from 'features/products/domain/repository/product_repository'
import { InvalidIntegerException } from 'features/shared/domain/exceptions/InvalidIntegerException'
import { InvalidStringException } from 'features/shared/domain/exceptions/InvalidStringException'
import { ValidInteger } from 'features/shared/domain/value_objects/ValidInteger'
import { ValidString } from 'features/shared/domain/value_objects/ValidString'
import { wrapType } from 'features/shared/utils/WrapType'

export const SearchProductByName = async ( repo: ProductRepository, props: {
	name: string,
	from: number,
	to: number
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
