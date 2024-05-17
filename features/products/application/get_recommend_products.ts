import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { InvalidIntegerException } from '../../shared/domain/exceptions/InvalidIntegerException'
import { InvalidRankException } from '../../shared/domain/exceptions/InvalidRankException'
import { InvalidStringException } from '../../shared/domain/exceptions/InvalidStringException'
import { InvalidUUIDException } from '../../shared/domain/exceptions/InvalidUUIDException'
import { UUID } from '../../shared/domain/value_objects/UUID'
import { ValidInteger } from '../../shared/domain/value_objects/ValidInteger'
import { ValidRank } from '../../shared/domain/value_objects/ValidRank'
import { ValidString } from '../../shared/domain/value_objects/ValidString'
import { wrapType } from '../../shared/utils/WrapType'
import { ProductResponse } from '../domain/models/product_response'
import { RecommendProduct } from '../domain/models/recommend_product'
import { ProductRepository } from '../domain/repository/product_repository'

export const GetRecommendProductsGroupByCategory = async ( repo: ProductRepository,
	props: {
		threshold: number,
		recommendProducts: {
			id: string,
			category: string
		}[],
		limit: number,
	} ): Promise<Map<string, ProductResponse[]>> => {

	const errors: BaseException[] = []

	const productResultList: RecommendProduct[] = []

	for ( const product of props.recommendProducts ) {
		const id = wrapType<UUID, InvalidUUIDException>(
			() => UUID.from( product.id ) )

		if ( id instanceof BaseException ) {
			errors.push( id )
		}

		const category = wrapType<ValidString, InvalidStringException>(
			() => ValidString.from( product.category ) )

		if ( category instanceof BaseException ) {
			errors.push( category )
		}

		if ( errors.length > 0 ) {
			throw errors
		}

		const productResult = new RecommendProduct(
			id as UUID, category as ValidString )

		productResultList.push( productResult )
	}

	const thresholdResult = wrapType<ValidRank, InvalidRankException>(
		() => ValidRank.from( props.threshold ) )

	if ( thresholdResult instanceof BaseException ) {
		errors.push( new InvalidRankException( 'threshold' ) )
	}

	const limitResult = wrapType<ValidInteger, InvalidIntegerException>(
		() => ValidInteger.from( props.limit ) )

	if ( limitResult instanceof BaseException ) {
		errors.push( new InvalidIntegerException( 'limit' ) )
	}

	if ( errors.length > 0 ) {
		throw errors
	}

	const productsDatabase = await repo.getProductsByRankThreshold(
		thresholdResult as ValidRank, limitResult as ValidInteger )

	const databaseProductsMap: Map<string, Map<string, ProductResponse>> = new Map()

	for ( const product of productsDatabase ) {
		const category = product.category.name.value
		if ( !databaseProductsMap.has( category ) ) {
			databaseProductsMap.set( category,
				new Map<string, ProductResponse>().set( product.id.value, product ) )
		}
		else {
			databaseProductsMap.get( category )!.set( product.id.value,
				product )
		}
	}

	const paramProductsMap: Map<string, Map<string, RecommendProduct>> = new Map()

	for ( const recommendProduct of productResultList ) {
		const category = recommendProduct.category_name.value
		if ( !paramProductsMap.has( category ) ) {
			paramProductsMap.set( category,
				new Map<string, RecommendProduct>().set( recommendProduct.id.value,
					recommendProduct ) )
		}
		else {
			paramProductsMap.get( category )!.set(
				recommendProduct.id.value,
				recommendProduct )
		}
	}


	const filteredProductsByCategories: Map<string, ProductResponse[]> = new Map()
	databaseProductsMap.forEach( ( dbCategoryMap, dbCategoryKey ) => {
		if ( paramProductsMap.has( dbCategoryKey ) ) {
			const paramMap = paramProductsMap.get( dbCategoryKey )!
			dbCategoryMap.forEach( ( product, dbProductKey ) => {
				// si no esta el producto en param map, quiere decir que seria uno nuevo/recomendado
				if ( !paramMap.has( dbProductKey ) ) {
					if ( !filteredProductsByCategories.has( dbCategoryKey ) ) {
						filteredProductsByCategories.set( dbCategoryKey, [] )
					}
					filteredProductsByCategories.get( dbCategoryKey )!.push( product )
				}
			} )
		}
	} )

	return filteredProductsByCategories
}



