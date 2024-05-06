import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from 'backend/database.types'
import { KeyAlreadyExistException } from '../../shared/infrastructure/key_already_exist_exception'
import { UUID } from '../../shared/domain/value_objects/UUID'
import { LimitIsNotInRangeException } from '../../shared/infrastructure/limit_is_not_in_range_exception'
import { ValidInteger } from '../../shared/domain/value_objects/ValidInteger'
import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { Email } from '../../shared/domain/value_objects/Email'
import { InfrastructureException } from '../../shared/infrastructure/infrastructure_exception'
import { ParameterNotMatchException } from '../../shared/infrastructure/parameter_not_match_exception'
import {
	cartFromJson,
} from '../application/cart_mapper'
import {
	Cart,
	CartProduct,
	CartUser
} from '../domain/cart'
import { CartRepository } from '../domain/cart_repository'

export class CartSupabaseData implements CartRepository {

	constructor( private readonly client: SupabaseClient<Database> ) {}

	readonly tableName = 'carts'

	async getAll( from: ValidInteger, to: ValidInteger,
		email?: Email ): Promise<Cart[]> {
		try {

			const result = this.client.from( this.tableName )
			                   .select( '*, product:product_id(*)' )

			if ( email !== undefined ) {
				result.eq( 'user_email', email.value )
			}

			const { data, error } = await result.range( from.value, to.value )

			if ( email != undefined && data?.length === 0 ) {
				throw [ new ParameterNotMatchException( 'user_email' ) ]
			}

			if ( error ) {
				if ( error.code === 'PGRST103' ) {
					throw [ new LimitIsNotInRangeException() ]
				}
				throw [ new InfrastructureException() ]
			}

			const carts: Cart[] = []
			for ( const json of data ) {
				const cart = cartFromJson( json )
				if ( cart instanceof BaseException ) {
					throw [ cart ]
				}
				carts.push( cart as Cart )
			}

			return carts
		}
		catch ( e ) {
			throw e
		}
	}

	async add( user_email: Email, product_id: UUID,
		quantity: ValidInteger ): Promise<boolean> {
		try {

			const result = await this.client.from( this.tableName )
			                         .insert( {
				                         user_email: user_email.value,
				                         product_id: product_id.value,
				                         quantity  : quantity.value
			                         } )

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

	async remove( email: Email, product_id: UUID ): Promise<boolean> {
		try {
			const result = await this.client.from( this.tableName )
			                         .select()
			                         .eq( 'user_email', email.value )
			                         .eq( 'product_id', product_id.value )

			if ( result.data?.length === 0 ) {
				throw [ new ParameterNotMatchException() ]
			}

			await this.client.from( this.tableName )
			          .delete()
			          .eq( 'user_email', email.value )
			          .eq( 'product_id', product_id.value )

			return true
		}
		catch ( e ) {
			throw e
		}
	}

	async removeAll( email: Email ): Promise<boolean> {
		try {
			const result = await this.client.from( this.tableName )
			                         .select()
			                         .eq( 'user_email', email.value )

			if ( result.data?.length === 0 ) {
				throw [ new ParameterNotMatchException( 'user_email' ) ]
			}

			await this.client.from( this.tableName )
			          .delete()
			          .eq( 'user_email', email.value )

			return true
		}
		catch ( e ) {
			throw e
		}
	}

	async update( user_email: Email, product_id: UUID,
		quantity: ValidInteger ): Promise<boolean> {
		try {
			await this.client.from( this.tableName )
			          .update( {
				          user_email: user_email.value,
				          product_id: product_id.value,
				          quantity  : quantity.value
			          } )
			          .eq( 'user_email', user_email.value )
			          .eq( 'product_id', product_id.value )

			return true

		}
		catch ( e ) {
			throw [ new InfrastructureException() ]
		}
	}

	async getByUserEmail( email: Email ): Promise<CartUser> {
		try {
			const result = await this.client.from( this.tableName )
			                         .select( '*, product:product_id(*)' )
			                         .eq( 'user_email', email.value )

			if ( result.error ) {
				throw [ new InfrastructureException() ]
			}

			if ( result.data.length === 0 ) {
				throw [ new ParameterNotMatchException( 'user_email' ) ]
			}

			const cartProducts: CartProduct[] = []

			for ( const c of result.data ) {
				const cartResult = cartFromJson( c )
				if ( cartResult instanceof BaseException ) {
					throw cartResult
				}

				const cart = cartResult as Cart
				cartProducts.push( new CartProduct(
					cart.quantity,
					cart.product
				) )
			}

			return new CartUser( email, cartProducts )
		}
		catch ( e ) {
			throw e
		}
	}

}
