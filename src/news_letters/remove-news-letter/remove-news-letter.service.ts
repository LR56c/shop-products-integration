import { Injectable } from '@nestjs/common'
import { DeleteNewsLetter } from '../../../packages/news_letter/application/delete_news_letter'
import { NewsLetterRepository } from '../../../packages/news_letter/domain/news_letter_repository'
import { Errors } from '../../../packages/shared/domain/exceptions/errors'

@Injectable()
export class RemoveNewsLetterService {

	constructor( private readonly repo: NewsLetterRepository ) {}

	async remove( email: string ): Promise<boolean> {
		const result = await DeleteNewsLetter( this.repo, email )

		if ( result instanceof Errors ) {
			throw [ ...result.values ]
		}

		return result
	}
}
