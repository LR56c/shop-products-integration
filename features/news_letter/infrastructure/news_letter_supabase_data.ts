import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from 'backend/database.types'
import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { Email } from '../../shared/domain/value_objects/Email'
import { ValidInteger } from '../../shared/domain/value_objects/ValidInteger'
import { ValidString } from '../../shared/domain/value_objects/ValidString'
import { InfrastructureException } from '../../shared/infrastructure/infrastructure_exception'
import { LimitIsNotInRangeException } from '../../shared/infrastructure/limit_is_not_in_range_exception'
import { ParameterNotMatchException } from '../../shared/infrastructure/parameter_not_match_exception'
import {
	newsLetterFromJson,
	newsLetterToJson
} from '../application/news_letter_mapper'
import { NewsLetter } from '../domain/news_letter'
import { NewsLetterRepository } from '../domain/news_letter_repository'

export class NewsLetterSupabaseData implements NewsLetterRepository {

	constructor( private readonly client: SupabaseClient<Database> ) {}

	readonly tableName = 'news_letter'

	async add( newsLetter: NewsLetter ): Promise<boolean> {
		try {

			const result = await this.client.from( this.tableName )
			                         .insert( newsLetterToJson( newsLetter ) as any )

			if ( result.error != null ) {
				throw [ new InfrastructureException() ]
			}
			return true
		}
		catch ( e ) {
			throw e
		}
	}

	async checkByEmail( email: Email ): Promise<boolean> {
		try {
			const result = await this.client.from( this.tableName )
			                         .select()
			                         .eq( 'email', email.value )

			if ( result.error ) {
				throw [ new InfrastructureException() ]
			}

			if ( result.data?.length === 0 ) {
				throw [ new ParameterNotMatchException( 'email' ) ]
			}

			return true
		}
		catch ( e ) {
			throw e
		}
	}

	async remove( email: Email ): Promise<boolean> {
		try {

			const result = await this.client.from( this.tableName )
			                         .select()
			                         .eq( 'email', email.value )
			if ( result.data?.length === 0 ) {
				throw [ new ParameterNotMatchException( 'email' ) ]
			}

			await this.client.from( this.tableName )
			          .delete()
			          .eq( 'email', email.value )

			return true
		}
		catch ( e ) {
			throw e
		}
	}

	async getAll( from: ValidInteger, to: ValidInteger,
		name?: ValidString ): Promise<NewsLetter[]> {

		const result = this.client.from( this.tableName )
		                   .select()

		if ( name !== undefined ) {
			result.eq( 'name', name.value )
		}

		const { data, error } = await result.range( from.value, to.value )

		if ( error ) {
			if ( error.code === 'PGRST103' ) {
				throw [ new LimitIsNotInRangeException() ]
			}
			throw [ new InfrastructureException() ]
		}

		const newsLetters: NewsLetter[] = []
		for ( const json of data ) {
			const newsLetter = newsLetterFromJson( json )

			if ( newsLetter instanceof BaseException ) {
				throw newsLetter
			}
			newsLetters.push( newsLetter as NewsLetter )
		}

		return newsLetters
	}
}
