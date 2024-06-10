import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from 'database.types'
import { Errors } from '../../shared/domain/exceptions/errors'
import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { InvalidStringException } from '../../shared/domain/exceptions/InvalidStringException'
import { UUID } from '../../shared/domain/value_objects/uuid'
import { ValidDate } from '../../shared/domain/value_objects/valid_date'
import { ValidInteger } from '../../shared/domain/value_objects/valid_integer'
import { ValidString } from '../../shared/domain/value_objects/valid_string'

import { ValidURL } from '../../shared/domain/value_objects/valid_url'
import { InfrastructureException } from '../../shared/infrastructure/infrastructure_exception'
import { KeyAlreadyExistException } from '../../shared/infrastructure/key_already_exist_exception'
import { LimitIsNotInRangeException } from '../../shared/infrastructure/limit_is_not_in_range_exception'
import { ParameterNotMatchException } from '../../shared/infrastructure/parameter_not_match_exception'
import { wrapType } from '../../shared/utils/wrap_type'
import {
	reportFromJson,
	reportToJson
} from '../application/report_mapper'
import { Report } from '../domain/models/report'
import { ReportType } from '../domain/models/report_type'
import { ReportDAO } from 'packages/report/domain/repository/report_dao'

export class ReportSupabaseDataDAO implements ReportDAO {

	constructor( private readonly client: SupabaseClient<Database> ) {}

	readonly tableName = 'reports'

	// readonly tableRelatedName = 'reports_products'

	async create( type: ReportType, name: ValidString,
		data: Uint8Array ): Promise<ValidURL> {
		const result = await this.client.storage.from( this.tableName )
		                         .upload( name.value, data )

		if ( result.error != null ) {
			throw [ new InfrastructureException( 'upload' ) ]
		}

		const resultPath = this.client.storage.from( this.tableName )
		                       .getPublicUrl( name.value )

		const pathResult = wrapType<ValidURL, InvalidStringException>(
			() => ValidURL.from( resultPath.data.publicUrl ) )

		if ( pathResult instanceof BaseException ) {
			throw [ new InvalidStringException() ]
		}

		const report = new Report(
			UUID.create(),
			name,
			pathResult as ValidURL,
			type,
			ValidDate.from( new Date() )
		)

		const save = await this.client.from( this.tableName )
		                       .insert( reportToJson( report ) as any )

		if ( save.error != null ) {
			if ( save.error.code === '23505' ) {
				throw [ new KeyAlreadyExistException( 'report' ) ]
			}
			throw [ new InfrastructureException() ]
		}

		return pathResult
	}

	async delete( id: UUID ): Promise<boolean> {
		try {


			const result = await this.client.from( this.tableName )
			                         .select()
			                         .eq( 'id', id.value )

			if ( result.data?.length === 0 ) {
				throw [ new ParameterNotMatchException( 'report' ) ]
			}

			const report = reportFromJson( result.data![0] )

			if ( report instanceof Errors ) {
				throw [ ...report.values ]
			}

			const r               = report as Report
			const { data, error } = await this.client.storage.from( this.tableName )
			                                  .remove( [ r.name.value ] )

			if ( error != null ) {
				throw [ new InfrastructureException( 'delete' ) ]
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

	async getAll( from: ValidInteger, to: ValidInteger, type?: ReportType,
		from_date?: ValidDate, to_date?: ValidDate ): Promise<Report[]> {
		const result = this.client.from( this.tableName )
		                   .select()

		if ( type !== undefined ) {
			result.eq( 'type', type.value )
		}

		if ( from_date !== undefined && to_date !== undefined ) {
			result.gte( 'date', from_date.value )
			result.lte( 'date', to_date.value )
		}


		const { data, error } = await result.range( from.value, to.value )

		if ( data?.length === 0 ) {
			throw [ new ParameterNotMatchException( 'report' ) ]
		}

		if ( error ) {
			if ( error.code === 'PGRST103' ) {
				throw [ new LimitIsNotInRangeException() ]
			}
			throw [ new InfrastructureException() ]
		}

		const reports: Report[] = []
		for ( const json of data ) {

			const r = reportFromJson( json )

			if ( r instanceof Errors ) {
				throw [ ...r.values ]
			}
			reports.push( r as Report )
		}

		return reports
	}


}
