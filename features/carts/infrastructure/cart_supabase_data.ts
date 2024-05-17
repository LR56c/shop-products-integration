import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from 'backend/database.types'
import { CartProductResponse } from 'features/carts/domain/cart_response'
import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { Email } from '../../shared/domain/value_objects/Email'
import { UUID } from '../../shared/domain/value_objects/UUID'
import { ValidInteger } from '../../shared/domain/value_objects/ValidInteger'
import { InfrastructureException } from '../../shared/infrastructure/infrastructure_exception'
import { KeyAlreadyExistException } from '../../shared/infrastructure/key_already_exist_exception'
import { ParameterNotMatchException } from '../../shared/infrastructure/parameter_not_match_exception'
import { cartProductResponseFromJson } from '../application/cart_mapper'
import { CartRepository } from '../domain/cart_repository'

export class CartSupabaseData implements CartRepository {

	constructor( private readonly client: SupabaseClient<Database> ) {}

	readonly tableName = 'carts'

	async upsert( user_email: Email, product_id: UUID,
		quantity: ValidInteger ): Promise<boolean> {
		try {

			const { data, error } = await this.client.from( this.tableName )
			                                  .upsert( {
				                                  user_email: user_email.value,
				                                  product_id: product_id.value,
				                                  quantity  : quantity.value
			                                  } )


			if ( error != null ) {
				if ( error.code === '23505' ) {
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

	async getByUserEmail( email: Email ): Promise<CartProductResponse[]> {
		try {
			const result = await this.client.from( this.tableName )
			                         .select( '*, products(*)' )
			                         .eq( 'user_email', email.value )

			if ( result.error ) {
				throw [ new InfrastructureException() ]
			}

			const cartProducts: CartProductResponse[] = []

			for ( const c of result.data ) {

				const discount   = c.products?.discount ?? null
				const json       = {
					...c,
					products: {
						...c.products,
						discounts: discount
					}
				}
				const cartResult = cartProductResponseFromJson( json )
				if ( cartResult instanceof BaseException ) {
					throw cartResult
				}

				cartProducts.push( cartResult as CartProductResponse )
			}

			return cartProducts
		}
		catch ( e ) {
			throw e
		}
	}
}
