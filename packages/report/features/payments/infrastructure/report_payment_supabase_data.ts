import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from 'database.types'
import { BaseException } from '../../../../shared/domain/exceptions/BaseException'
import { UUID } from '../../../../shared/domain/value_objects/uuid'
import { ValidDate } from '../../../../shared/domain/value_objects/valid_date'
import { ValidInteger } from '../../../../shared/domain/value_objects/valid_integer'
import { InfrastructureException } from '../../../../shared/infrastructure/infrastructure_exception'
import { KeyAlreadyExistException } from '../../../../shared/infrastructure/key_already_exist_exception'
import { LimitIsNotInRangeException } from '../../../../shared/infrastructure/limit_is_not_in_range_exception'
import { ParameterNotMatchException } from '../../../../shared/infrastructure/parameter_not_match_exception'

import {
	reportPaymentFromJson,
	reportPaymentToJson
} from '../application/report_payment_mapper'
import { ReportPayment } from '../domain/report_payment'
import { ReportPaymentRepository } from '../domain/report_payment_repository'

export class ReportPaymentSupabaseData implements ReportPaymentRepository {

	constructor( private readonly client: SupabaseClient<Database> ) {}

	readonly tableName = 'report_payments'

	async create( reportPayment: ReportPayment ): Promise<boolean> {
		const result = await this.client.from( this.tableName )
		                         .insert(
			                         reportPaymentToJson( reportPayment ) as any )

		if ( result.error != null ) {

			if ( result.error.code === '23505' ) {
				throw [ new KeyAlreadyExistException( 'reports_payments' ) ]
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
				throw [ new ParameterNotMatchException( 'report_payment' ) ]
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

	async get( from: ValidInteger, to: ValidInteger, from_date?: ValidDate,
		to_date?: ValidDate ): Promise<ReportPayment[]> {
		const result = this.client.from( this.tableName )
		                   .select()

		if ( from_date !== undefined && to_date !== undefined ) {
			result.gte( 'date', from_date.value.toUTCString() )
			result.lte( 'date', to_date.value.toUTCString() )
		}


		const { data, error } = await result.range( from.value, to.value )

		if ( data?.length === 0 ) {
			throw [ new ParameterNotMatchException( 'report_payment' ) ]
		}

		if ( error ) {
			if ( error.code === 'PGRST103' ) {
				throw [ new LimitIsNotInRangeException() ]
			}
			throw [ new InfrastructureException() ]
		}

		const reportPayments: ReportPayment[] = []
		for ( const json of data ) {

			const rp = reportPaymentFromJson( json )

			if ( rp instanceof BaseException ) {
				throw rp
			}
			reportPayments.push( rp as ReportPayment )
		}

		return reportPayments
	}

}
