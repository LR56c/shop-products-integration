import { Email } from '../../shared/domain/value_objects/email'
import { ValidInteger } from '../../shared/domain/value_objects/valid_integer'
import { ValidString } from '../../shared/domain/value_objects/valid_string'
import { InfrastructureException } from '../../shared/infrastructure/infrastructure_exception'
import { NewsLetter } from '../domain/news_letter'
import { NewsLetterRepository } from '../domain/news_letter_repository'

export class NewsLetterMemoryData implements NewsLetterRepository {

	constructor( db : NewsLetter[]  ) {
		this.db = new Map()

		db.forEach( ( newsLetter ) => {
			this.db.set( newsLetter.userEmail.value, newsLetter )
		} )
	}
	readonly db: Map<string, NewsLetter>

	async add( newsLetter: NewsLetter ): Promise<boolean> {
		try {
			const exist = this.db.get( newsLetter.userEmail.value )

			if ( exist !== undefined ) {
				throw [ new InfrastructureException() ]
			}

			this.db.set( newsLetter.userEmail.value, newsLetter )
			return true
		}
		catch ( e ) {
			throw e
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
			const newsLetter = this.db.get( email.value )

			if ( newsLetter === undefined ) {
				throw [ new InfrastructureException() ]
			}

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
			let newsLetters = Array.from( this.db.values() )


			if ( name !== undefined ) {
				newsLetters = newsLetters.filter( newsLetter => newsLetter.name.value === name.value )
			}

			return newsLetters.slice( from.value, to.value )
		}
		catch ( e ) {
			throw [ new InfrastructureException() ]
		}
	}

}
