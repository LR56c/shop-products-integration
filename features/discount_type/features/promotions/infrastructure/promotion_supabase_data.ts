import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from 'backend/database.types'
import { discountFromJson } from '../../../application/discount_mapper'
import { BaseException } from '../../../../shared/domain/exceptions/BaseException'
import { UUID } from '../../../../shared/domain/value_objects/UUID'
import { ValidDate } from '../../../../shared/domain/value_objects/ValidDate'
import { ValidInteger } from '../../../../shared/domain/value_objects/ValidInteger'
import { ValidString } from '../../../../shared/domain/value_objects/ValidString'
import { InfrastructureException } from '../../../../shared/infrastructure/infrastructure_exception'
import { KeyAlreadyExistException } from '../../../../shared/infrastructure/key_already_exist_exception'
import { ParameterNotMatchException } from '../../../../shared/infrastructure/parameter_not_match_exception'
import {
	PartialPromotionProduct,
	Promotion,
	PromotionProduct
} from '../domain/promotion'
import { PromotionRepository } from '../domain/promotion_repository'

export class PromotionSupabaseData implements PromotionRepository {

	constructor( private readonly client: SupabaseClient<Database> ) {}

	readonly tableName        = 'promotions'
	readonly tableRelatedName = 'promotions_products'

	async getAll( from: ValidInteger, to: ValidInteger, name?: ValidString,
		from_date?: ValidDate, to_date?: ValidDate ): Promise<Promotion[]> {
		try {
			const result = this.client.from( this.tableName )
			                   .select( '*, discounts(*),products(*)' )

			if ( name !== undefined ) {
				result.like( 'name', `%${ name.value }%` )
			}

			if ( from_date !== undefined && to_date !== undefined ) {
				result.gte( 'start_date', from_date.value )
				result.lte( 'end_date', to_date.value )
			}

			const { data, error } = await result.range( from.value, to.value )
			if ( error ) {
				if ( error.code === '22P02' ) {
					throw [ new ParameterNotMatchException() ]
				}
				throw [ new InfrastructureException('get all') ]
			}
			const discounts: Promotion[] = []
			for ( const json of data ) {
				const d = discountFromJson( {
						id: json.id,
						...json.discounts,
						promotions: {
							id      : json.id,
							name    : json.name,
							products: json.products
						}
					}
				)
				if ( d instanceof BaseException ) {
					throw d
				}
				discounts.push( d as Promotion )
			}
			return discounts
		}
		catch ( e ) {
			throw e
		}

	}

	async getByID( id: UUID ): Promise<Promotion> {
		try {
			const result = await this.client.from( this.tableName )
			                         .select( '*, discounts(*),products(*)' )
			                         .eq( 'id', id.value )

			if ( result.error ) {
				throw [ new InfrastructureException('get') ]
			}

			if ( result.data.length === 0 ) {
				throw [ new ParameterNotMatchException() ]
			}

			const json = result.data[0]
			const discount = discountFromJson( {
					id: json.id,
					...json.discounts,
					promotions: {
						id      : json.id,
						name    : json.name,
						products: json.products
					}
				}
			)

			if ( discount instanceof BaseException ) {
				throw discount
			}

			return discount as Promotion

		}
		catch ( e ) {
			throw e
		}
	}

	async linkProducts( promotion_id: UUID,
		products: PartialPromotionProduct[] ): Promise<boolean> {

		for ( const p of products ) {

			const result = await this.client.from( this.tableRelatedName )
			                         .insert( {
				                         promotion_id: promotion_id.value,
				                         quantity		: p.quantity.value,
				                         product_id  : p.product_id.value
			                         } )

			if ( result.error != null ) {
				if ( result.error.code === '23505' ) {
					throw [ new KeyAlreadyExistException( 'id' ) ]
				}
				throw [ new InfrastructureException('link') ]
			}
		}
		return true
	}
}
