import { Injectable } from '@nestjs/common'
import { NewsLetter } from '~features/news_letter/domain/news_letter'
import { NewsLetterRepository } from '~features/news_letter/domain/news_letter_repository'

@Injectable()
export class AddNewsLetterService {

	constructor( private readonly repo: NewsLetterRepository ) {}

	public addNewsLetter( newsLetter: NewsLetter ): Promise<boolean> {
		return this.repo.add( newsLetter )
	}
}
