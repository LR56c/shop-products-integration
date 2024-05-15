import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from 'backend/database.types'
import { OrderResponse } from 'features/orders/domain/order_response'
import { DataNotFoundException } from '../../shared/infrastructure/data_not_found_exception'
import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { Email } from '../../shared/domain/value_objects/Email'
import { UUID } from '../../shared/domain/value_objects/UUID'
import { ValidInteger } from '../../shared/domain/value_objects/ValidInteger'
import { InfrastructureException } from '../../shared/infrastructure/infrastructure_exception'
import { KeyAlreadyExistException } from '../../shared/infrastructure/key_already_exist_exception'
import { LimitIsNotInRangeException } from '../../shared/infrastructure/limit_is_not_in_range_exception'
import { ParameterNotMatchException } from '../../shared/infrastructure/parameter_not_match_exception'
import {
	orderFromJson,
	orderResponseFromJson,
	orderToJson
} from '../application/order_mapper'
import {
	Order,
} from '../domain/order'
import { OrderRepository } from '../domain/order_repository'

export class OrderSupabaseData implements OrderRepository {

	constructor( private readonly client: SupabaseClient<Database> ) {}

	readonly tableName = 'orders'

	async createOrder( order: Order ): Promise<boolean> {

		const jsonOrder = orderToJson(order)
		delete jsonOrder.products
		const { data, error } = await this.client.from( this.tableName )
		                                  .insert(  jsonOrder as any)
		                                  .select()

		if ( error != null ) {
			if ( error.code === '23503' ) {
				throw [ new DataNotFoundException() ]
			}
			if ( error.code === '23505' ) {
				throw [ new KeyAlreadyExistException( 'order' ) ]
			}
			throw [ new InfrastructureException( 'order' ) ]
		}

		const jsonProducts   = order.products.map( op => ( {
			quantity  : op.quantity.value,
			product_id: op.product.value,
			order_id  : data[0].id
		} ) )
		const productResults = await this.client.from( 'orders_products' )
		                                 .insert( jsonProducts )

		if ( productResults.error ) {
			throw [ new InfrastructureException( 'products_id' ) ]
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
		client_email?: Email ): Promise<OrderResponse[]> {
		const result = this.client.from( this.tableName )
		                   .select(
			                   '*, payment:payment_id(*), products(*), orders_confirmed(*), item_confirmed(*)' )

		if ( client_email !== undefined ) {
			result.eq( 'client_email', client_email.value )
		}

		const { data, error } = await result.range( from.value, to.value )

		if ( client_email != undefined && data?.length === 0 ) {
			throw [ new ParameterNotMatchException( 'client_email' ) ]
		}

		if ( error ) {
			if ( error.code === 'PGRST103' ) {
				throw [ new LimitIsNotInRangeException() ]
			}
			throw [ new InfrastructureException() ]
		}

		const orders: OrderResponse[] = []
		for ( const json of data ) {

			const o = orderResponseFromJson( json )

			if ( o instanceof BaseException ) {
				throw o
			}
			orders.push( o as OrderResponse )
		}

		return orders
	}

	async getOrder( id: UUID ): Promise<OrderResponse> {
		try {
			const result = await this.client.from( this.tableName )
			                         .select(
				                         '*, payment:payment_id(*), products(*)' )
			                         .eq( 'id', id.value )

			if ( result.error ) {
				throw [ new InfrastructureException() ]
			}

			if ( result.data.length === 0 ) {
				throw [ new ParameterNotMatchException( 'order_id' ) ]
			}

			const order = orderResponseFromJson( result.data[0] )

			if ( order instanceof BaseException ) {
				throw order
			}

			return order as OrderResponse
		}
		catch ( e ) {
			throw e
		}

	}

	async updateOrder( id: UUID, order: Order ): Promise<boolean> {
		try {
			await this.client.from( this.tableName )
			          .update( {
				          client_email   : order.client_email.value,
				          payment_id     : order.payment.value,
				          seller_email   : order.seller_email?.value,
				          order_confirmed: order.order_confirmed?.value,
				          item_confirmed : order.item_confirmed?.value
			          } )
			          .eq(
				          'id',
				          id.value
			          )
			          .select()

			await this.client.from( 'orders_products' )
			          .delete()
			          .eq( 'order_id', id.value )

			const productsJson   = order.products.map( op => ( {
				quantity  : op.quantity.value,
				product_id: op.product.value,
				order_id  : id.value
			} ) )
			const productResults = await this.client.from( 'orders_products' )
			                                 .insert( productsJson )

			if ( productResults.error ) {
				throw [ new InfrastructureException( 'products_id' ) ]
			}

			return true
		}
		catch ( e ) {
			throw e
		}

	}
}
