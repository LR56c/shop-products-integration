import { InvalidIntegerException } from '../../shared/domain/exceptions/InvalidIntegerException'
import { ValidInteger } from '../../shared/domain/value_objects/ValidInteger'
import { InvalidRankException } from '../domain/exceptions/InvalidRankException'
import { Product } from '../domain/models/product'
import { ValidRank } from '../domain/models/ValidRank'
import { ProductRepository } from '../domain/repository/product_repository'
import { wrapType } from '../../shared/utils/WrapType'

export const GetRecommendProductsGroupByCateogry = async ( repo: ProductRepository, props: {
	threshold: string,
	products: Product[],
	limit: string,
} ): Promise<Map<string, Product[]>> => {
	const errors: Error[] = []

	const thresholdResult = wrapType<ValidRank, InvalidRankException>(
		() => ValidRank.from( props.threshold ) )

	if ( thresholdResult instanceof Error ) {
		errors.push( new InvalidRankException( 'threshold' ) )
	}

	const limitResult = wrapType<ValidInteger, InvalidIntegerException>(
		() => ValidInteger.from( props.limit ) )

	if ( limitResult instanceof Error ) {
		errors.push( new InvalidIntegerException( 'limit' ) )
	}

	if ( errors.length > 0 ) {
		throw errors
	}

	return await repo.getRecommendProductsGroupByCategory( thresholdResult as ValidRank,
		props.products, limitResult as ValidInteger )

}
