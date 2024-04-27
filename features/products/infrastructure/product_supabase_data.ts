import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from 'backend/database.types'
import { Product } from '../domain/models/Product'
import { ProductRepository } from '../domain/repository/product_repository'
import { ValidInteger } from '../../shared/domain/value_objects/ValidInteger'
import { ValidString } from '../../shared/domain/value_objects/ValidString'
import { ValidRank } from '../domain/models/ValidRank'


export class ProductSupabaseData implements ProductRepository {
	constructor( private readonly client: SupabaseClient<Database> ) {}

	async createProduct( product: Product ): Promise<boolean> {
		return false
	}

	async getAll( limit: ValidInteger ): Promise<Product[]> {
		return []
	}

	async getProduct( id: ValidString ): Promise<Product> {
		throw new Error( 'Method not implemented jajajajaja.' )
	}

	async updateProduct(
		code: ValidString,
		product: Product
	): Promise<boolean> {
		return false
	}

	async deleteProduct( code: ValidString ): Promise<boolean> {
		return false
	}

	async searchProduct(
		name: ValidString,
		limit: ValidInteger
	): Promise<Product[]> {
		return []
	}

	public getRecommendProducts( threshold: ValidRank,
    products: Product[],
    from: ValidInteger,
    to: ValidInteger ): Promise<Product[]> {

		const set = new Set(products.map( product => product.category_name.value ))

		set.forEach( category => {
			//peticion
			//agrego lista/mapa de productos, viendo si el rank es mayor al threshold
			//from/to se aplica para cada query
		})

		//return lista de productos
		return Promise.resolve( [] )
	}
}