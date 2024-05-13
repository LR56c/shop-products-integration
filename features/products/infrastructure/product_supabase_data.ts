import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from 'backend/database.types'
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

	async getProduct( id : UUID ): Promise<Product> {
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

	public getRecommendProductsGroupByCategory( threshold: ValidRank,
		products: Product[],
		limit: ValidInteger ): Promise<Map<string, Product[]>> {

		const categoriesSet = new Set(
			products.map( product => product.category_name.value ) )

		const mapResult = new Map<string, Product[]>()

		console.log( 'set' )
		categoriesSet.forEach( async ( category ) => {
			console.log( 'cat' )
			const categoryQueryProducts = await this.client.from( this.tableName )
			                                        .select()
			                                        .eq( 'category', category )
			                                        .gte( 'rank', threshold.value )
			                                        .limit( limit.value )

			if ( categoryQueryProducts.error ) {
				console.log( 'supabase unexpected error' )
				console.log( categoryQueryProducts.error )
				throw [ new InfrastructureException() ]
			}

			//Map<categoryName, rawProducts]>

			const errors: BaseException[] = []

			const parsedQueryProducts: Product[] = []

			console.log( 'json product supa' )
			for ( const json of categoryQueryProducts.data ) {
				const p = productFromJson( json )

				if ( p instanceof BaseException ) {
					errors.push( p )
					throw errors
				}

				parsedQueryProducts.push( p as Product )
			}

			// const unMatchedProducts = parsedQueryProducts.filter(
			// 	bd => !products.some( p => p.product_code === bd.product_code ) )

			mapResult.set( category, parsedQueryProducts )
		} )

		return Promise.resolve( mapResult )
	}
}
