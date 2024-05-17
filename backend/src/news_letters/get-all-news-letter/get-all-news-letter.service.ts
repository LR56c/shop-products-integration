import { Injectable } from '@nestjs/common'
import { GetAllNewsLetter } from '~features/news_letter/application/get_all_news_letter'
import { NewsLetter } from '~features/news_letter/domain/news_letter'
import { NewsLetterRepository } from '~features/news_letter/domain/news_letter_repository'

@Injectable()
export class GetAllNewsLetterService {
	constructor( private readonly repo: NewsLetterRepository ) {}

	async getAllNewsLetter( from: number, to: number,
		name ?: string ): Promise<NewsLetter[]> {
		return GetAllNewsLetter( this.repo, { from, to, name } )
	}
}
