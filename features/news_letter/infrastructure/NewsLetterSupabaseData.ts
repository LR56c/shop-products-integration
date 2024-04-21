import {
	SupabaseClient
} from '@supabase/supabase-js'
import {
	Database
} from 'backend/database.types'
import { Email } from '../../shared/domain/value_objects/Email'
import { NewsLetter } from '../domain/models/NewsLetter'
import { NewsLetterRepository } from '../domain/repository/NewsLetterRepository'
import { SupabaseDataException } from './SupabaseDataError'

export class NewsLetterSupabaseData implements NewsLetterRepository {

	constructor( private readonly client: SupabaseClient<Database> ) {}

	async add( email: Email ): Promise<boolean> {
		return false
	}

	async check( email: Email ): Promise<boolean> {
		return false
	}

	async remove( email: Email ): Promise<boolean> {
		return false
	}


	/**
	 * Get all NewsLetters
	 * @throws {SupabaseDataException} - if data is invalid
	 */
	async getAll(): Promise<NewsLetter[]> {

		const { data, error } = await this.client
		                                  .from( 'news_letter' )
		                                  .select( '*' )

		if ( error ) {
			throw new SupabaseDataException()
		}

		console.log( "data")
		console.log( data)

		return data.map( ( newsLetterTable ) => {
			return NewsLetter.from( {
				email    : newsLetterTable.email,
				name     : newsLetterTable.name,
				createdAt: new Date( newsLetterTable.created_at )
			} )
		} )
	}

}
