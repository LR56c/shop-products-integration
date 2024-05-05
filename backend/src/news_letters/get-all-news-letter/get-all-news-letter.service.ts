import { Injectable } from '@nestjs/common'
import { NewsLetter } from '~features/news_letter/domain/news_letter'
import { NewsLetterRepository } from '~features/news_letter/domain/news_letter_repository'
import { ValidInteger } from '~features/shared/domain/value_objects/ValidInteger'
import { ValidString } from '~features/shared/domain/value_objects/ValidString'

@Injectable()
export class GetAllNewsLetterService {
	constructor( private readonly repo: NewsLetterRepository ) {}

	public async getAllNewsLetter( from: ValidInteger, to: ValidInteger,
		name ?: ValidString ): Promise<NewsLetter[]> {
		return this.repo.getAll( from, to, name )
	}
}
