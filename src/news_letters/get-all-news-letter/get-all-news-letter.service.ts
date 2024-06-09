import { Injectable } from '@nestjs/common'
import { GetAllNewsLetter } from 'packages/news_letter/application/get_all_news_letter'
import { NewsLetter } from 'packages/news_letter/domain/news_letter'
import { NewsLetterRepository } from 'packages/news_letter/domain/news_letter_repository'
import { Errors } from 'packages/shared/domain/exceptions/errors'

@Injectable()
export class GetAllNewsLetterService {
	constructor( private readonly repo: NewsLetterRepository ) {}

	async getAllNewsLetter( from: number, to: number,
		name ?: string ): Promise<NewsLetter[]> {
		const result = await GetAllNewsLetter( this.repo, { from, to, name } )

		if ( result instanceof Errors ) {
			throw [ ...result.values ]
		}

		return result
	}
}
