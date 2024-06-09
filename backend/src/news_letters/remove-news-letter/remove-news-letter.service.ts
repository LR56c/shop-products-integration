import { Injectable } from '@nestjs/common'
import { DeleteNewsLetter } from '~features/news_letter/application/delete_news_letter'
import { NewsLetterRepository } from '~features/news_letter/domain/news_letter_repository'
import { Errors } from '~features/shared/domain/exceptions/errors'

@Injectable()
export class RemoveNewsLetterService {

	constructor( private readonly repo: NewsLetterRepository ) {}

	async remove( email: string ): Promise<boolean> {
		const result = await DeleteNewsLetter( this.repo, email )

		if ( result instanceof Errors ) {
			throw [...result.values]
		}

		return result
	}
}
