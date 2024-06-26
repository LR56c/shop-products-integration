import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from 'database.types'
import { Errors } from '../../shared/domain/exceptions/errors'
import { UUID } from '../../shared/domain/value_objects/uuid'
import { ValidInteger } from '../../shared/domain/value_objects/valid_integer'
import { InfrastructureException } from '../../shared/infrastructure/infrastructure_exception'
import { KeyAlreadyExistException } from '../../shared/infrastructure/key_already_exist_exception'
import { LimitIsNotInRangeException } from '../../shared/infrastructure/limit_is_not_in_range_exception'
import { ParameterNotMatchException } from '../../shared/infrastructure/parameter_not_match_exception'
import { itemConfirmedFromJson } from '../application/item_confimed_mapper'
import { ItemConfirmed } from '../domain/item_confirmed'
import { ItemConfirmedRepository } from '../domain/item_confirmed_repository'

export class ItemConfirmedSupabaseData implements ItemConfirmedRepository {
	constructor( private readonly client: SupabaseClient<Database> ) {}

	readonly tableName = 'items_confirmed'

	async create( order_confirmed: ItemConfirmed ): Promise<boolean> {
		const result = await this.client.from( this.tableName )
		                         .insert( {
			                         id               : order_confirmed.id.value,
			                         created_at       : order_confirmed.creation_date.value,
			                         shop_keeper_email: order_confirmed.shop_keeper_email?.value
		                         } as any )

		if ( result.error != null ) {
			if ( result.error.code === '23505' ) {
				throw [ new KeyAlreadyExistException() ]
			}

			throw [ new InfrastructureException() ]
		}
		return true
	}

	async delete( id: UUID ): Promise<boolean> {
		try {

			const result = await this.client.from( this.tableName )
			                         .select()
			                         .eq( 'id', id.value )

			if ( result.data?.length === 0 ) {
				throw [ new ParameterNotMatchException() ]
			}

			await this.client.from( this.tableName )
			          .delete()
			          .eq( 'id', id.value )

			return true
		}
		catch ( e ) {
			throw e
		}
	}

	async getAll( from: ValidInteger,
		to: ValidInteger ): Promise<ItemConfirmed[]> {
		try {
			const result = await this.client.from( this.tableName )
			                         .select()
			                         .range( from.value, to.value )

			if ( result.error ) {
				if ( result.error.code === 'PGRST103' ) {
					throw [ new LimitIsNotInRangeException() ]
				}
				throw [ new InfrastructureException() ]
			}

			if ( result.data.length === 0 ) {
				throw [ new ParameterNotMatchException() ]
			}
			const ordersConfirmed: ItemConfirmed[] = []

			for ( const orderConfirmed of result.data ) {
				const order = itemConfirmedFromJson( orderConfirmed )

				if ( order instanceof Errors ) {
					throw [...order.values]
				}

				ordersConfirmed.push( order as ItemConfirmed )
			}

			return ordersConfirmed
		}
		catch ( e ) {
			throw e
		}
	}

	async get( id: UUID ): Promise<ItemConfirmed> {
		try {
			const result = await this.client.from( this.tableName )
			                         .select()
			                         .eq( 'id', id.value )

			if ( result.error ) {
				throw [ new InfrastructureException() ]
			}

			if ( result.data.length === 0 ) {
				throw [ new ParameterNotMatchException() ]
			}

			const orderConfirmed = itemConfirmedFromJson( result.data[0] )

			if ( orderConfirmed instanceof Errors ) {
				throw [...orderConfirmed.values]
			}

			return orderConfirmed as ItemConfirmed
		}
		catch ( e ) {
			throw e
		}

	}

}
