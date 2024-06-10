import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from 'database.types'
import { Errors } from '../../shared/domain/exceptions/errors'
import { UUID } from '../../shared/domain/value_objects/uuid'
import { ValidInteger } from '../../shared/domain/value_objects/valid_integer'
import { InfrastructureException } from '../../shared/infrastructure/infrastructure_exception'
import { KeyAlreadyExistException } from '../../shared/infrastructure/key_already_exist_exception'
import { LimitIsNotInRangeException } from '../../shared/infrastructure/limit_is_not_in_range_exception'
import { ParameterNotMatchException } from '../../shared/infrastructure/parameter_not_match_exception'
import { orderConfirmedFromJson } from '../application/order_confirmed_mapper'
import { OrderConfirmed } from '../domain/order_confirmed'
import { OrderConfirmedRepository } from '../domain/order_confirmed_repository'

export class OrderConfirmedSupabaseData implements OrderConfirmedRepository {

	constructor( private readonly client: SupabaseClient<Database> ) {}

	readonly tableName = 'orders_confirmed'

	async create( order_confirmed: OrderConfirmed ): Promise<boolean> {
		const result = await this.client.from( this.tableName )
		                         .insert( {
			                         id              : order_confirmed.id.value,
			                         created_at      : order_confirmed.creation_date.value,
			                         accountant_email: order_confirmed.accountant_email?.value
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
		to: ValidInteger ): Promise<OrderConfirmed[]> {
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
			const ordersConfirmed: OrderConfirmed[] = []

			for ( const orderConfirmed of result.data ) {
				const order = orderConfirmedFromJson( orderConfirmed )

				if ( order instanceof Errors ) {
					throw [...order.values]
				}

				ordersConfirmed.push( order as OrderConfirmed )
			}

			return ordersConfirmed
		}
		catch ( e ) {
			throw e
		}
	}

	async get( id: UUID ): Promise<OrderConfirmed> {
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

			const orderConfirmed = orderConfirmedFromJson( result.data[0] )

			if ( orderConfirmed instanceof Errors ) {
				throw [...orderConfirmed.values]
			}

			return orderConfirmed as OrderConfirmed
		}
		catch ( e ) {
			throw e
		}
	}
}
