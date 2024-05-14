import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from 'backend/database.types'
import { RecommendProduct } from 'features/products/domain/models/recommend_product'
import { UUID } from 'features/shared/domain/value_objects/UUID'
import { ParameterNotMatchException } from '../../shared/infrastructure/parameter_not_match_exception'
import { LimitIsNotInRangeException } from '../../shared/infrastructure/limit_is_not_in_range_exception'
import { KeyAlreadyExistException } from '../../shared/infrastructure/key_already_exist_exception'
import { ValidRank } from '../../shared/domain/value_objects/ValidRank'
import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { InfrastructureException } from '../../shared/infrastructure/infrastructure_exception'
import {
	productFromJson,
	productToJson
} from '../application/product_mapper'
import { ProductRepository } from '../domain/repository/product_repository'
import { ValidInteger } from '../../shared/domain/value_objects/ValidInteger'
import { ValidString } from '../../shared/domain/value_objects/ValidString'
import { Product } from '../domain/models/product'


export class ProductSupabaseData implements ProductRepository {
	constructor( private readonly client: SupabaseClient<Database> ) {}

	readonly tableName = 'products'

	async createProduct( product: Product ): Promise<boolean> {
		const result = await this.client.from( this.tableName )
		                         .insert( productToJson( product ) as any )

		if ( result.error != null ) {

			if ( result.error.code === '23505' ) {
				throw [ new KeyAlreadyExistException( 'product' ) ]
			}
			throw [ new InfrastructureException() ]
		}
		return true
	}

	async getAll( from: ValidInteger, to: ValidInteger,
		name?: ValidString ): Promise<Product[]> {

		const result = this.client.from( this.tableName )
		                   .select()

		if ( name !== undefined ) {
			result.eq( 'name', name.value )
		}

		const { data, error } = await result.range( from.value, to.value )

		if ( name != undefined && data?.length === 0 ) {
			throw [ new ParameterNotMatchException( 'name' ) ]
		}

		if ( error ) {
			if ( error.code === 'PGRST103' ) {
				throw [ new LimitIsNotInRangeException() ]
			}
			throw [ new InfrastructureException() ]
		}

		const products: Product[] = []
		for ( const json of data ) {

			const product = productFromJson( json )

			if ( product instanceof BaseException ) {
				throw product
			}
			products.push( product as Product )
		}

		return products
	}

	async getProduct( id: UUID ): Promise<Product> {
		try {
			const result = await this.client.from( this.tableName )
			                         .select()
			                         .eq( 'id', id.value )

			if ( result.error ) {
				throw [ new InfrastructureException() ]
			}

			if ( result.data.length === 0 ) {
				throw [ new ParameterNotMatchException( 'id' ) ]
			}

			const product = productFromJson( result.data[0] )

			if ( product instanceof BaseException ) {
				throw product
			}

			return product as Product
		}
		catch ( e ) {
			throw e
		}
	}

	async updateProduct(
		id: UUID,
		product: Product
	): Promise<boolean> {
		try {
			await this.client.from( this.tableName )
			          .update( productToJson( product ) as any )
			          .eq(
				          'id',
				          id.value
			          )
			return true
		}
		catch ( e ) {
			throw [ new InfrastructureException() ]
		}
	}

	async deleteProduct( id: UUID ): Promise<boolean> {
		try {
			const result = await this.client.from( this.tableName )
			                         .select()
			                         .eq( 'id', id.value )

			if ( result.data?.length === 0 ) {
				throw [ new ParameterNotMatchException( 'id' ) ]
			}

			await this.client.from( this.tableName )
			          .delete()
			          .eq(
				          'id',
				          id.value
			          )
			return true
		}
		catch ( e ) {
			throw e
		}
	}

	async getRecommendProductsGroupByCategory( threshold: ValidRank,
		recommendProducts: RecommendProduct[],
		limit: ValidInteger ): Promise<Map<string, Product[]>> {

		const productsDatabaseResult = await this.client.from( this.tableName )
		                                         .select()
		                                         .gte( 'average_rank',
			                                         threshold.value )
		                                         .limit( limit.value )

		if ( productsDatabaseResult.error != null ) {
			throw [ new InfrastructureException() ]
		}

		const productsDatabase: Product[] = []

		for ( const json of productsDatabaseResult.data ) {
			const product = productFromJson( json )
			if ( product instanceof BaseException ) {
				throw product
			}
			productsDatabase.push( product as Product )
		}

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

		for ( const recommendProduct of recommendProducts ) {
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
					if(!paramMap.has(dbProductKey)){
						if(!filteredProductsByCategories.has(dbCategoryKey)){
							filteredProductsByCategories.set(dbCategoryKey, [])
						}
						filteredProductsByCategories.get(dbCategoryKey)!.push(product)
					}
				} )
			}
		} )

		return filteredProductsByCategories
	}
}
