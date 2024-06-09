import { Email } from '../../shared/domain/value_objects/email'
import { ValidInteger } from '../../shared/domain/value_objects/valid_integer'
import { ValidString } from '../../shared/domain/value_objects/valid_string'
import { InfrastructureException } from '../../shared/infrastructure/infrastructure_exception'
import { NewsLetter } from '../domain/news_letter'
import { NewsLetterRepository } from '../domain/news_letter_repository'

export class NewsLetterMemoryData implements NewsLetterRepository {

	constructor( readonly db: Map<string, NewsLetter> ) {}

	async add( newsLetter: NewsLetter ): Promise<boolean> {
		try {
			this.db.set( newsLetter.userEmail.value, newsLetter )
			return true
		}
		catch ( e ) {
			throw [ new InfrastructureException() ]
		}
	}

	async checkByEmail( email: Email ): Promise<boolean> {
		try {
			const newsLetter = this.db.get( email.value )

			if ( newsLetter === undefined ) {
				throw [ new InfrastructureException() ]
			}

			return true
		}
		catch ( e ) {
			throw e
		}
	}

	async remove( email: Email ): Promise<boolean> {
		try {
			this.db.delete( email.value )
			return true
		}
		catch ( e ) {
			throw [ new InfrastructureException() ]
		}
	}

	async getAll( from: ValidInteger, to: ValidInteger,
		name?: ValidString ): Promise<NewsLetter[]> {
		try {
			const newsLetters = Array.from( this.db.values() )

			const result: NewsLetter[] = []

			if ( name !== undefined ) {
				result.push(
					...newsLetters.filter( newsLetter => newsLetter.name === name ) )
			}

			result.slice( from.value, to.value )

			return result
		}
		catch ( e ) {
			throw [ new InfrastructureException() ]
		}
	}

}
