import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from 'backend/database.types'
import { BaseException } from '../../../../shared/domain/exceptions/BaseException'
import { UUID } from '../../../../shared/domain/value_objects/UUID'
import { ValidDate } from '../../../../shared/domain/value_objects/ValidDate'
import { ValidInteger } from '../../../../shared/domain/value_objects/ValidInteger'
import { InfrastructureException } from '../../../../shared/infrastructure/infrastructure_exception'
import { ParameterNotMatchException } from '../../../../shared/infrastructure/parameter_not_match_exception'
import { saleFromJson } from '../application/sale_mapper'
import { Sale } from '../domain/sale'
import { SaleRepository } from '../domain/sale_repository'

export class SaleSupabaseData implements SaleRepository {

	constructor( private readonly client: SupabaseClient<Database> ) {}

	readonly tableName = 'sales'

	async getAll( from: ValidInteger, to: ValidInteger, from_date?: ValidDate,
		to_date?: ValidDate ): Promise<Sale[]> {
		try {
			const result = this.client.from( this.tableName )
			                   .select( '*, discounts(*)' )

			if ( from_date !== undefined && to_date !== undefined ) {
				result.gte( 'start_date', from_date.value )
				result.lte( 'end_date', to_date.value )
			}

			const { data, error } = await result.range( from.value, to.value )
			if ( error ) {
				if ( error.code === '22P02' ) {
					throw [ new ParameterNotMatchException() ]
				}
				throw [ new InfrastructureException() ]
			}
			const discounts: Sale[] = []
			for ( const json of data ) {
				const d = saleFromJson( {
						...json.discounts,
						sales: {
							id        : json.id,
							product_id: json.product_id
						}
					}
				)
				if ( d instanceof BaseException ) {
					throw d
				}
				discounts.push( d as Sale )
			}
			return discounts
		}
		catch ( e ) {
			throw e
		}
	}

	async getByID( id: UUID ): Promise<Sale> {
		try {
			const result = await this.client.from( this.tableName )
			                         .select( '*, discounts(*)' )
			                         .eq( 'id', id.value )

			if ( result.error ) {
				throw [ new InfrastructureException() ]
			}

			if ( result.data.length === 0 ) {
				throw [ new ParameterNotMatchException() ]
			}

			const json     = result.data[0]
			const discount = saleFromJson( {
					...json.discounts,
					sales: {
						id        : json.id,
						product_id: json.product_id
					}
				}
			)

			if ( discount instanceof BaseException ) {
				throw discount
			}

			return discount as Sale

		}
		catch ( e ) {
			throw e
		}
	}

}
