import { ProductRepository } from '../domain/repository/product_repository'
import { InvalidStringException } from '../../shared/domain/exceptions/InvalidStringException'
import { ValidString } from '../../shared/domain/value_objects/ValidString'
import { wrapType } from '../../shared/utils/WrapType'

export const DeleteProduct = async ( repo: ProductRepository, props: {
	code: string
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

	return await repo.deleteProduct( codeResult as ValidString )
}
