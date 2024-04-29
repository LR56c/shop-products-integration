import {
	SupabaseClient
} from '@supabase/supabase-js'
import {
	Database
} from 'backend/database.types'
import { ValidInteger } from 'features/shared/domain/value_objects/ValidInteger'
import { ValidString } from '../../shared/domain/value_objects/ValidString'
import { Email } from '../../shared/domain/value_objects/Email'
import { NewsLetter } from '../domain/models/NewsLetter'
import { NewsLetterRepository } from '../domain/repository/NewsLetterRepository'
import { SupabaseDataException } from './SupabaseDataException'

export class NewsLetterSupabaseData implements NewsLetterRepository {

	constructor( private readonly client: SupabaseClient<Database> ) {}

	async add( email: Email, name :ValidString ): Promise<boolean> {
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
	async getAll(limit : ValidInteger): Promise<NewsLetter[]> {

		const { data, error } = await this.client
		                                  .from( 'news_letter' )
		                                  .select( '*' )
		                                  .limit(limit.value)

		if ( error ) {
			throw new SupabaseDataException()
		}

		return data.map( ( newsLetterTable ) => {
			return NewsLetter.from( {
				email    : newsLetterTable.email,
				name     : newsLetterTable.name,
				createdAt: new Date( newsLetterTable.created_at )
			} )
		} )
	}

}
