import { Injectable } from '@nestjs/common'
import { AddNewsLetter } from '~features/news_letter/application/add_news_letter'
import { NewsLetterRepository } from '~features/news_letter/domain/news_letter_repository'
import { Errors } from '~features/shared/domain/exceptions/errors'
import { NewsLetterDto } from '../dto/news_letter_dto'

@Injectable()
export class AddNewsLetterService {

	constructor( private readonly repo: NewsLetterRepository ) {}

	async addNewsLetter( props: NewsLetterDto ): Promise<boolean> {
		const result = await AddNewsLetter( this.repo, {
			userEmail: props.email,
			name     : props.name,
			createdAt: props.created_at
		} )

		if ( result instanceof Errors ) {
			throw [...result.values]
		}

		return result
	}
}

