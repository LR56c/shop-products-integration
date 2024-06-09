import { Injectable } from '@nestjs/common'
import { GetNewsLetter } from '~features/news_letter/application/get_news_letter'
import { NewsLetterRepository } from '~features/news_letter/domain/news_letter_repository'
import { Errors } from '~features/shared/domain/exceptions/errors'

@Injectable()
export class CheckNewsLetterService {
	constructor( private readonly repo: NewsLetterRepository ) {}

	public async checkNewsLetter( email: string ): Promise<boolean> {
		const result = await GetNewsLetter( this.repo, email )

		if ( result instanceof Errors ) {
			throw [...result.values]
		}

		return result
	}
}
