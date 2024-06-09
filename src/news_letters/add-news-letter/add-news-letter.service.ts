import { Injectable } from '@nestjs/common'
import { AddNewsLetter } from 'packages/news_letter/application/add_news_letter'
import { NewsLetterRepository } from 'packages/news_letter/domain/news_letter_repository'
import { Errors } from 'packages/shared/domain/exceptions/errors'
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
			throw [ ...result.values ]
		}

		return result
	}
}

