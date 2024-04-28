import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from 'backend/database.types'
import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { InfrastructureException } from '../../shared/infrastructure/infrastructure_exception'
import {
	productFromJson,
	productToJson
} from '../application/product_mapper'
import { Product } from '../domain/models/Product'
import { ProductRepository } from '../domain/repository/product_repository'
import { ValidInteger } from '../../shared/domain/value_objects/ValidInteger'
import { ValidString } from '../../shared/domain/value_objects/ValidString'
import { ValidRank } from '../domain/models/ValidRank'


export class ProductSupabaseData implements ProductRepository {
	constructor( private readonly client: SupabaseClient<Database> ) {}

	readonly tableName = 'products'

	async deleteAll(): Promise<boolean> {
		const result = await this.client.from( this.tableName )
		                         .delete()

		if ( result.error ) {
			console.log( 'supabase unexpected error' )
			console.log( result.error )
			throw [ new InfrastructureException() ]
		}

		return true
	}

	async createProduct( product: Product ): Promise<boolean> {

		const result = await this.client.from( this.tableName )
		                         .insert( productToJson( product ) as any )
		if ( result.error ) {
			console.log( 'supabase unexpected error' )
			console.log( result.error )
			throw [ new InfrastructureException() ]
		}
		return true
	}

	async getAll( from: ValidInteger, to: ValidInteger ): Promise<Product[]> {
		const result = await this.client.from( this.tableName )
		                         .select()
		                         .range( from.value, to.value )

		if ( result.error ) {
			console.log( 'supabase unexpected error' )
			console.log( result.error )
			throw [ new InfrastructureException() ]
		}

		const errors: BaseException[] = []
		const products: Product[]     = []
		for ( const json of result.data ) {

			const product = productFromJson( json )

			if ( product instanceof BaseException ) {
				errors.push( product )
				throw errors
			}
			products.push( product as Product )
		}

		return products
	}

	async getProduct( code: ValidString ): Promise<Product> {
		const result = await this.client.from( this.tableName )
		                         .select()
		                         .eq( 'product_code', code.value )

		if ( result.error ) {
			console.log( 'supabase unexpected error' )
			console.log( result.error )
			throw [ new InfrastructureException() ]
		}

		const product = productFromJson( result.data[0] )

		if ( product instanceof BaseException ) {
			throw product
		}

		return product as Product
	}

	async updateProduct(
		code: ValidString,
		product: Product
	): Promise<boolean> {
		const result = await this.client.from( this.tableName )
		                         .update( productToJson( product ) as any )
		                         .eq(
			                         'product_code',
			                         code.value
		                         )

		if ( result.error ) {
			console.log( 'supabase unexpected error' )
			console.log( result.error )
			throw [ new InfrastructureException() ]
		}

		return true
	}

	async deleteProduct( code: ValidString ): Promise<boolean> {
		const result = await this.client.from( this.tableName )
		                         .delete()
		                         .eq(
			                         'product_code',
			                         code.value
		                         )

		if ( result.error ) {
			console.log( 'supabase unexpected error' )
			console.log( result.error )
			throw [ new InfrastructureException() ]
		}

		return true
	}

	async searchProduct( name: ValidString, from: ValidInteger,
		to: ValidInteger ): Promise<Product[]> {

		const result = await this.client.from( this.tableName )
		                         .select()
		                         .range( from.value, to.value )
		                         .ilike( 'name', `%${ name.value }%` )

		if ( result.error ) {
			console.log( 'supabase unexpected error' )
			console.log( result.error )
			throw [ new InfrastructureException() ]
		}

		const errors: BaseException[] = []

		const products: Product[] = []

		for ( const json of result.data ) {
			const product = productFromJson( json )

			if ( product instanceof BaseException ) {
				errors.push( product )
				throw errors
			}

			products.push( product as Product )
		}

		return products
	}

	public getRecommendProductsGroupByCategory( threshold: ValidRank,
		products: Product[],
		limit: ValidInteger): Promise<Map<string, Product[]>> {

		const categoriesSet = new Set(
			products.map( product => product.category_name.value ) )

		const map = new Map<string, Product[]>()

		console.log( 'set' )
		categoriesSet.forEach( async ( category ) => {
			console.log( 'cat' )
			const categoryQueryProducts = await this.client.from( this.tableName )
			                                        .select()
			                                        .eq( 'category', category )
			                                        .gte( 'rank', threshold.value )
			                                        .limit(limit.value)

			if ( categoryQueryProducts.error ) {
				console.log( 'supabase unexpected error' )
				console.log( categoryQueryProducts.error )
				throw [ new InfrastructureException() ]
			}

			const errors: BaseException[] = []

			const parsedQueryProducts: Product[] = []

			//TODO: en caso de diccionario, se guardan los productos en un diccionario
			// en otro diccionario de cateogira, y luego se recorre el diccionario de
			// categorias y se recorre el diccionario de productos, quedando un
			// diccionario de productos nuevos y se mapean
			console.log( 'json' )
			for ( const json of categoryQueryProducts.data ) {
				const p = productFromJson( json )

				if ( p instanceof BaseException ) {
					errors.push( p )
					throw errors
				}

				parsedQueryProducts.push( p as Product )
			}

			//TODO: no es valido hacerlo aqui porque revisaria productos que no estan
			// en categoria, habria que hacerlo afuera, e igualmente no seria tan eficiente

			// const unMatchedProducts = parsedQueryProducts.filter(
			// 	bd => !products.some( p => p.product_code === bd.product_code ) )

			map.set( category, parsedQueryProducts )
		} )

		return Promise.resolve( map )
	}
}

//TODO: colocar todos los metodos en try/catch
