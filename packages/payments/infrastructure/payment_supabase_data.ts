import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from 'database.types'

import { Errors } from '../../shared/domain/exceptions/errors'
import { UUID } from '../../shared/domain/value_objects/uuid'
import { ValidBool } from '../../shared/domain/value_objects/valid_bool'
import { ValidDate } from '../../shared/domain/value_objects/valid_date'
import { ValidInteger } from '../../shared/domain/value_objects/valid_integer'
import { InfrastructureException } from '../../shared/infrastructure/infrastructure_exception'
import { ParameterNotMatchException } from '../../shared/infrastructure/parameter_not_match_exception'
import {
	paymentFromJson,
	paymentToJson
} from '../application/payment_mapper'
import { Payment } from '../domain/models/payment'
import { PaymentRepository } from '../domain/repository/payment_repository'

export class PaymentSupabaseData implements PaymentRepository {
	constructor( private readonly client: SupabaseClient<Database> ) {}

	readonly tableName = 'payments'

	async createPayment( payment: Payment ): Promise<boolean> {
		const result = await this.client.from( this.tableName )
		                         .insert( paymentToJson( payment ) as any )

		if ( result.error ) {
			if ( result.error.code === '23505' ) {
				throw [ new ParameterNotMatchException() ]
			}
			throw [ new InfrastructureException() ]
		}

		return true
	}

	async getPayment( id: UUID ): Promise<Payment> {
		const result = await this.client.from( this.tableName )
		                         .select()
		                         .eq( 'id', id.value )
		if ( result.error ) {
			throw [ new InfrastructureException() ]
		}
		const payment = paymentFromJson( result.data[0] )
		if ( payment instanceof Errors ) {
			throw [ ...payment.values ]
		}
		return payment as Payment
	}

	async getAllPayment( from: ValidInteger, to: ValidInteger,
		approved?: ValidBool,
		from_date?: ValidDate, to_date?: ValidDate ): Promise<Payment[]> {
		try {
			const result = this.client.from( this.tableName )
			                   .select()
			if ( approved !== undefined ) {
				result.eq( 'approved', approved?.value )
			}
			if ( from_date !== undefined && to_date !== undefined ) {
				result.lte( 'date', from_date.value )
				result.gte( 'date', to_date.value )
			}

			const { data, error } = await result.range( from.value, to.value )

			if ( error ) {
				if ( error.code === '22P02' ) {
					throw [ new ParameterNotMatchException() ]
				}
				throw [ new InfrastructureException() ]
			}

			const payments: Payment[] = []
			for ( const json of data ) {
				const payment = paymentFromJson( json )
				if ( payment instanceof Errors ) {
					throw [ ...payment.values ]
				}
				payments.push( payment as Payment )
			}
			return payments
		}
		catch ( e ) {
			throw [ new InfrastructureException() ]
		}

	}

	async updatePayment( payment: Payment ): Promise<boolean> {
		try {
			await this.client.from( this.tableName )
			          .update( paymentToJson( payment ) as any )
			          .eq( 'id', payment.id.value )
			return true
		}
		catch ( e ) {
			throw [ new InfrastructureException() ]
		}
	}

	async deletePayment( id: UUID ): Promise<boolean> {
		try {
			await this.client.from( this.tableName )
			          .delete()
			          .eq( 'id', id.value )
			return true
		}
		catch ( e ) {
			throw new InfrastructureException()
		}
	}
}
