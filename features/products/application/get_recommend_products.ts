import { InvalidIntegerException } from '../../shared/domain/exceptions/InvalidIntegerException'
import { ValidInteger } from '../../shared/domain/value_objects/ValidInteger'
import { InvalidRankException } from '../domain/exceptions/InvalidRankException'
import { Product } from '../domain/models/product'
import { ValidRank } from '../domain/models/ValidRank'
import { ProductRepository } from '../domain/repository/product_repository'
import { wrapType } from '../../shared/utils/WrapType'

export const GetRecommendProducts = async ( repo: ProductRepository, props: {
	threshold: number,
	products: Product[],
	from: string,
	to: string
} ): Promise<Product[]> => {
	const errors: Error[] = []

	const thresholdResult = wrapType<ValidRank, InvalidRankException>(
		() => ValidRank.from( props.threshold ) )

	if ( thresholdResult instanceof Error ) {
		errors.push( new InvalidRankException( 'threshold' ) )
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

	return await repo.getRecommendProducts( thresholdResult as ValidRank,
		props.products, fromResult as ValidInteger, toResult as ValidInteger )

}
