import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from 'database.types'

import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { UUID } from '../../shared/domain/value_objects/uuid'
import { ValidInteger } from '../../shared/domain/value_objects/valid_integer'
import { ValidRank } from '../../shared/domain/value_objects/valid_rank'
import { ValidString } from '../../shared/domain/value_objects/valid_string'
import { InfrastructureException } from '../../shared/infrastructure/infrastructure_exception'
import { KeyAlreadyExistException } from '../../shared/infrastructure/key_already_exist_exception'
import { LimitIsNotInRangeException } from '../../shared/infrastructure/limit_is_not_in_range_exception'
import { ParameterNotMatchException } from '../../shared/infrastructure/parameter_not_match_exception'
import {
	productResponseFromJson,
	productToJson
} from '../application/product_mapper'
import { Product } from '../domain/models/product'
import { ProductResponse } from '../domain/models/product_response'
import { ProductRepository } from '../domain/repository/product_repository'


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
			throw [ new InfrastructureException( 'create' ) ]
		}
		return true
	}

	async getAll( from: ValidInteger, to: ValidInteger,
		name?: ValidString ): Promise<ProductResponse[]> {

		const result = this.client.from( this.tableName )
		                   .select( '*, categories(*), discounts(*)' )

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
			throw [ new InfrastructureException( 'get all' ) ]
		}

		const products: ProductResponse[] = []
		for ( const json of data ) {

			const product = productResponseFromJson( json )

			if ( product instanceof BaseException ) {
				throw product
			}
			products.push( product as ProductResponse )
		}

		return products
	}

	async getProduct( id: UUID ): Promise<ProductResponse> {
		try {
			const result = await this.client.from( this.tableName )
			                         .select( '*, categories(*), discounts(*)' )
			                         .eq( 'id', id.value )

			if ( result.error ) {
				throw [ new InfrastructureException( 'get' ) ]
			}

			if ( result.data.length === 0 ) {
				throw [ new ParameterNotMatchException( 'id' ) ]
			}

			const product = productResponseFromJson( result.data[0] )

			if ( product instanceof BaseException ) {
				throw product
			}

			return product as ProductResponse
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
			const result = await this.client.from( this.tableName )
			                         .update( productToJson( product ) as any )
			                         .eq(
				                         'id',
				                         id.value
			                         )
			if ( result.error != null ) {
				if ( result.error.code === '23505' ) {
					throw [ new KeyAlreadyExistException() ]
				}

				throw [ new InfrastructureException() ]
			}
			return true
		}
		catch ( e ) {
			throw e
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

	async getProductsByRankThreshold( threshold: ValidRank,
		limit: ValidInteger ): Promise<ProductResponse[]> {

		const productsDatabaseResult = await this.client.from( this.tableName )
		                                         .select(
			                                         '*, categories(*), discounts(*)' )
		                                         .gte( 'average_rank',
			                                         threshold.value )
		                                         .limit( limit.value )

		if ( productsDatabaseResult.error != null ) {
			throw [ new InfrastructureException() ]
		}

		const productsDatabase: ProductResponse[] = []

		for ( const json of productsDatabaseResult.data ) {
			const product = productResponseFromJson( json )
			if ( product instanceof BaseException ) {
				throw product
			}
			productsDatabase.push( product as ProductResponse )
		}
		return productsDatabase
	}
}
