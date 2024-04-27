import { InvalidRankException } from '../domain/exceptions/InvalidRankException'
import { Product } from '../domain/models/product'
import { ValidRank } from '../domain/models/ValidRank'
import { ProductRepository } from '../domain/repository/product_repository'
import { wrapType } from '../../shared/utils/WrapType'

export const GetRecommendProducts = async ( repo: ProductRepository, props: {
	threshold: number,
	products: Product[],
	from: number,
	to: number
} ): Promise<Product[]> => {
	const errors: Error[] = []

	const thresholdResult = wrapType<ValidRank, InvalidRankException>(
		() => ValidRank.from( props.threshold ) )

	if ( thresholdResult instanceof Error ) {
		errors.push( new InvalidRankException( 'threshold' ) )
	}

	const fromResult = wrapType<ValidRank, InvalidRankException>(
		() => ValidRank.from( props.from ) )

	if ( fromResult instanceof Error ) {
		errors.push( new InvalidRankException( 'from' ) )
	}

	const toResult = wrapType<ValidRank, InvalidRankException>(
		() => ValidRank.from( props.to ) )

	if ( toResult instanceof Error ) {
		errors.push( new InvalidRankException( 'to' ) )
	}

	if ( errors.length > 0 ) {
		throw errors
	}

	return await repo.getRecommendProducts( thresholdResult as ValidRank,
		props.products, fromResult as ValidRank, toResult as ValidRank )

}
