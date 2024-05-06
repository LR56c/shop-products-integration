import { Injectable } from '@nestjs/common';
import { NewsLetterRepository } from '~features/news_letter/domain/news_letter_repository'
import { Email } from '~features/shared/domain/value_objects/Email'

@Injectable()
export class RemoveNewsLetterService {

	constructor(private readonly repo : NewsLetterRepository) {}

	public async remove( email: Email ): Promise<boolean> {
		return this.repo.remove(email)
	}
}
