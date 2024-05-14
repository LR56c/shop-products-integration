import { RecommendProduct } from '../domain/models/recommend_product'
import { ValidInteger } from '../../shared/domain/value_objects/ValidInteger'
import { Product } from '../domain/models/product'
import { ProductRepository } from '../domain/repository/product_repository'

export const GetRecommendProductsGroupByCategory = async ( repo: ProductRepository,
	props: {
		threshold: ValidInteger,
		recommendProducts: RecommendProduct[],
		limit: ValidInteger,
	} ): Promise<Map<string, Product[]>> => {
	const productsDatabase = await repo.getProductsByRankThreshold(
		props.threshold, props.limit )

	const databaseProductsMap: Map<string, Map<string, Product>> = new Map()

	for ( const product of productsDatabase ) {
		const category = product.category_name.value
		if ( !databaseProductsMap.has( category ) ) {
			databaseProductsMap.set( category,
				new Map<string, Product>().set( product.id.value, product ) )
		}
		else {
			databaseProductsMap.get( category )!.set( product.id.value,
				product )
		}
	}

	const paramProductsMap: Map<string, Map<string, RecommendProduct>> = new Map()

	for ( const recommendProduct of props.recommendProducts ) {
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


	const filteredProductsByCategories: Map<string, Product[]> = new Map()
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
