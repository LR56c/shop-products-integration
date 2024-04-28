import { InsufficientStockException } from '../domain/exceptions/InsufficientStockException'
import { Product } from '../domain/models/product'
import { ProductRepository } from '../domain/repository/product_repository'
import { InvalidStringException } from '../../shared/domain/exceptions/InvalidStringException'
import { ValidInteger } from '../../shared/domain/value_objects/ValidInteger'
import { ValidString } from '../../shared/domain/value_objects/ValidString'
import { wrapType } from '../../shared/utils/WrapType'

export const UpdateProduct = async ( repo: ProductRepository, props: {
	code: string,
	product: Product
	subtractStock: boolean
} ): Promise<boolean> => {
	const errors: Error[] = []

	const codeResult = wrapType<ValidString, InvalidStringException>(
		() => ValidString.from( props.code ) )

	if ( codeResult instanceof Error ) {
		errors.push( new InvalidStringException( 'code' ) )
	}

	if ( errors.length > 0 ) {
		throw errors
	}

	if ( props.subtractStock ) {

		const newStock = wrapType<Product, InsufficientStockException>(
			() => props.product.subtractStock( ValidInteger.from( '1' ) ) )

		if ( newStock instanceof Error ) {
			errors.push( new InsufficientStockException() )
			throw errors
		}

		return await repo.updateProduct( codeResult as ValidString, newStock as Product )
	}

	return await repo.updateProduct( codeResult as ValidString, props.product )
}
