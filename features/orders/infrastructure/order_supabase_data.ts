import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from 'backend/database.types'
import {
	orderFromJson,
} from '../application/order_mapper'
import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { ValidBool } from '../../shared/domain/value_objects/ValidBool'
import { ValidDate } from '../../shared/domain/value_objects/ValidDate'
import { InfrastructureException } from '../../shared/infrastructure/infrastructure_exception'
import { KeyAlreadyExistException } from '../../shared/infrastructure/key_already_exist_exception'
import { LimitIsNotInRangeException } from '../../shared/infrastructure/limit_is_not_in_range_exception'
import { ParameterNotMatchException } from '../../shared/infrastructure/parameter_not_match_exception'
import { OrderRepository } from '../domain/order_repository'
import { Email } from '../../shared/domain/value_objects/Email'
import { UUID } from '../../shared/domain/value_objects/UUID'
import { ValidInteger } from '../../shared/domain/value_objects/ValidInteger'
import { Order } from '../domain/order'

export class OrderSupabaseData implements OrderRepository {

	constructor( private readonly client: SupabaseClient<Database> ) {}

	readonly tableName = 'orders'

	async createOrder( id: UUID,
		seller_email: Email,
		client_email: Email,
		creation_date: ValidDate,
		approved: ValidBool,
		payment_id: UUID ): Promise<boolean> {

		const result = await this.client.from( this.tableName )
		                         .insert({
			                         id					: id.value,
			                         approved			: approved.value,
			                         client_email: client_email.value,
			                         created_at: creation_date.value,
			                         payment_id: payment_id.value,
			                         seller_email: seller_email.value
		                         } as any)

		if ( result.error != null ) {

			if ( result.error.code === '23505' ) {
				throw [ new KeyAlreadyExistException( 'order' ) ]
			}
			throw [ new InfrastructureException() ]
		}
		return true
	}

	async deleteOrder( id: UUID ): Promise<boolean> {
		try {
			const result = await this.client.from( this.tableName )
			                         .select()
			                         .eq( 'id', id.value )

			if ( result.data?.length === 0 ) {
				throw [ new ParameterNotMatchException( 'order_id' ) ]
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

	async getAll( from: ValidInteger, to: ValidInteger,
		client_email?: Email ): Promise<Order[]> {
		const result = this.client.from( this.tableName )
		                   .select('*, payment:payment_id(*), products(*)')

		if ( client_email !== undefined ) {
			result.eq( 'client_email', client_email.value )
		}

		const { data, error } = await result.range( from.value, to.value )
		console.log("data, error")
		console.log(data, error)

		if ( client_email != undefined && data?.length === 0 ) {
			throw [ new ParameterNotMatchException( 'client_email' ) ]
		}

		if ( error ) {
			if ( error.code === 'PGRST103' ) {
				throw [ new LimitIsNotInRangeException() ]
			}
			throw [ new InfrastructureException() ]
		}

		const orders: Order[] = []
		for ( const json of data ) {

			const o = orderFromJson( json )

			if ( o instanceof BaseException ) {
				throw o
			}
			orders.push( o as Order )
		}

		return orders
	}

	async getOrder( id: UUID ): Promise<Order> {
		try {
			const result = await this.client.from( this.tableName )
			                         .select('*, payment:payment_id(*), products(*)')
			                         .eq( 'id', id.value )

			if ( result.error ) {
				throw [ new InfrastructureException() ]
			}

			if ( result.data.length === 0 ) {
				throw [ new ParameterNotMatchException( 'order_id' ) ]
			}
			console.log(result.data[0])

			const order = orderFromJson( result.data[0] )

			if ( order instanceof BaseException ) {
				throw order
			}

			return order as Order
		}
		catch ( e ) {
			throw e
		}

	}

	async updateOrder(  id: UUID,
		seller_email: Email,
		client_email: Email,
		creation_date: ValidDate,
		approved: ValidBool,
		payment_id: UUID  ): Promise<boolean> {
		try {
			await this.client.from( this.tableName )
			          .update( {
				          seller_email : seller_email.value,
				          client_email : client_email.value,
				          created_at: creation_date.value,
				          approved     : approved.value,
				          payment_id   : payment_id.value
			          } as any)
			          .eq(
				          'id',
				          id.value
			          )
			return true
		}
		catch ( e ) {
			throw [ new InfrastructureException() ]
		}

	}

}
