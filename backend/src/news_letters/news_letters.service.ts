import { Injectable } from '@nestjs/common'
import { NewsLetter } from '~features/news_letter/domain/models/NewsLetter'
import { NewsLetterRepository } from '~features/news_letter/domain/repository/NewsLetterRepository'
import { Email } from '~features/shared/domain/value_objects/Email'
import { ValidInteger } from '~features/shared/domain/value_objects/ValidInteger'
import { ValidString } from '~features/shared/domain/value_objects/ValidString'

@Injectable()
export class NewsLettersService implements NewsLetterRepository {
	constructor( private repository: NewsLetterRepository ) {}

	async add( email: Email, name: ValidString ): Promise<boolean> {
		return this.repository.add( email, name )
	}

	async check( email: Email ): Promise<boolean> {
		return this.repository.check( email )
	}

	async remove( email: Email ): Promise<boolean> {
		return this.repository.remove( email )
	}

	async getAll( limit: ValidInteger ): Promise<NewsLetter[]> {
		return this.repository.getAll( limit )
	}

}
