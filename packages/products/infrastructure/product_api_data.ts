import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { UUID } from '../../shared/domain/value_objects/uuid'
import { ValidInteger } from '../../shared/domain/value_objects/valid_integer'
import { ValidRank } from '../../shared/domain/value_objects/valid_rank'
import { ValidString } from '../../shared/domain/value_objects/valid_string'
import { InfrastructureException } from '../../shared/infrastructure/infrastructure_exception'
import {
	productResponseFromJson,
	productToJson
} from '../application/product_mapper'
import { Product } from '../domain/models/product'
import { ProductResponse } from '../domain/models/product_response'
import { ProductRepository } from '../domain/repository/product_repository'

export class ProductApiData implements ProductRepository {


	readonly host = 'http://localhost:3000/products'

	async createProduct( product: Product ): Promise<boolean> {
		try {
			const response = await fetch( this.host, {
				method: 'POST',
				body  : JSON.stringify( productToJson( product ) )
			} )
			const data     = await response.json()
			console.log( 'create data' )
			console.log( data )
			return true
		}
		catch ( e ) {
			throw e
		}
	}

	async deleteProduct( id: UUID ): Promise<boolean> {
		try {
			const response = await fetch( `${ this.host }/${ id.value }`, {
				method: 'DELETE'
			} )
			const data     = await response.json()
			console.log( 'delete data' )
			console.log( data )
			return true
		}
		catch ( e ) {
			throw e
		}
	}

	async getAll( from: ValidInteger, to: ValidInteger,
		name?: ValidString ): Promise<ProductResponse[]> {
		try {
			const params = new URLSearchParams()
			params.append( 'from', from.value.toString() )
			params.append( 'to', to.value.toString() )
			if ( name !== undefined ) {
				params.append( 'name', name.value )
			}
			const responseResult = await fetch(
				`${ this.host }?${ params.toString() }`, {
					method: 'GET'
				} )
			const response       = await responseResult.json()

			if ( response.statusCode === 200 ) {

				const products: ProductResponse[] = []

				for ( const d of response.data ) {
					const product = productResponseFromJson( d )
					if ( product instanceof BaseException ) {
						throw product
					}

					products.push( product as ProductResponse )
				}

				return products
			}
			else {
				throw [ new InfrastructureException( 'get all products' ) ]
			}
		}
		catch ( e ) {
			throw e
		}
	}

	async getProduct( id: UUID ): Promise<ProductResponse> {
		try {
			const response = await fetch( `${ this.host }/${ id.value }`, {
				method: 'GET'
			} )
			const data     = await response.json()
			console.log( 'get data' )
			console.log( data )
			throw new Error( 'Method not implemented.' )
		}
		catch ( e ) {
			throw e
		}
	}

	async getProductsByRankThreshold( threshold: ValidRank,
		limit: ValidInteger ): Promise<ProductResponse[]> {
		try {
			const response = await fetch( `${ this.host }/recommend`, {
				method: 'POST',
				body  : JSON.stringify( {
					threshold: threshold.value,
					limit    : limit.value
				} )
			} )
			const data     = await response.json()
			console.log( 'recommend data' )
			console.log( data )
			return []
		}
		catch ( e ) {
			throw e
		}
	}

	async updateProduct( id: UUID, product: Product ): Promise<boolean> {
		try {
			const response = await fetch( `${ this.host }/${ id.value }`, {
				method: 'PUT',
				body  : JSON.stringify( productToJson( product ) )
			} )
			const data     = await response.json()
			console.log( 'update data' )
			console.log( data )
			return true
		}
		catch ( e ) {
			throw e
		}
	}

}
