import { Product } from '../domain/models/product'
import { ProductRepository } from '../domain/repository/product_repository'
import { InvalidIntegerException } from '../../shared/domain/exceptions/InvalidIntegerException'
import { ValidInteger } from '../../shared/domain/value_objects/ValidInteger'
import { wrapType } from '../../shared/utils/WrapType'

export const GetAllProducts = async (repo : ProductRepository, props : {
	from: number
	to: number
}): Promise<Product[]> =>   {

	const errors : Error[] = []

	const fromResult = wrapType<ValidInteger, InvalidIntegerException>(
		() => ValidInteger.from( props.from ) )

	if ( fromResult instanceof Error ) {
		errors.push(new InvalidIntegerException('from'))
	}

	const toResult = wrapType<ValidInteger, InvalidIntegerException>(
		() => ValidInteger.from( props.to ) )

	if ( toResult instanceof Error ) {
		errors.push(new InvalidIntegerException('to'))
	}

	if ( errors.length > 0 ) {
		throw errors
	}

  return await repo.getAll(toResult as ValidInteger, fromResult as ValidInteger)
}
