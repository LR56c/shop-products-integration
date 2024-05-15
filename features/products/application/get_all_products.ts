import { Product } from 'features/products/domain/models/product'
import { ProductRepository } from 'features/products/domain/repository/product_repository'
import { BaseException } from 'features/shared/domain/exceptions/BaseException'
import { InvalidStringException } from 'features/shared/domain/exceptions/InvalidStringException'
import { ValidString } from 'features/shared/domain/value_objects/ValidString'
import { wrapType } from 'features/shared/utils/WrapType'
import { ValidInteger } from '../../shared/domain/value_objects/ValidInteger'
import { InvalidIntegerException } from '../../shared/domain/exceptions/InvalidIntegerException'

export const GetAllProducts = async (
	repo: ProductRepository,
	props:{
		from: number,
		to: number,
		name?: string
	} ): Promise<Product[]> => {

	const errors: BaseException[] = []

	const fromResult = wrapType<ValidInteger, InvalidIntegerException>(
		() => ValidInteger.from( props.from ) )

	if ( fromResult instanceof BaseException ) {
		errors.push( new InvalidIntegerException( 'from' ) )
	}

	const toResult = wrapType<ValidInteger, InvalidIntegerException>(
		() => ValidInteger.from( props.to ) )

	if ( toResult instanceof BaseException ) {
		errors.push( new InvalidIntegerException( 'to' ) )
	}

	const name = props.name === undefined
		? undefined
		: wrapType<ValidString, InvalidStringException>(
			() => ValidString.from( props.name ?? '' ) )

	if ( name != undefined && name instanceof
		BaseException )
	{
		errors.push( new InvalidStringException( 'name' ) )
	}

	if ( errors.length > 0 ) {
		throw errors
	}

	return repo.getAll( fromResult as ValidInteger, toResult as ValidInteger, name! as ValidString)
}