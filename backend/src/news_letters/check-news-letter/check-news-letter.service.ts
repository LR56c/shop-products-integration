import { Injectable } from '@nestjs/common'
import { GetNewsLetter } from '~features/news_letter/application/get_news_letter'
import { NewsLetterRepository } from '~features/news_letter/domain/news_letter_repository'

@Injectable()
export class CheckNewsLetterService {
	constructor( private readonly repo: NewsLetterRepository ) {}

	public async checkNewsLetter( email: string ): Promise<boolean> {
		return GetNewsLetter( this.repo, email )
	}
}
