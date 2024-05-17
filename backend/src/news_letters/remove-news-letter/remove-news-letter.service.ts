import { Injectable } from '@nestjs/common';
import { NewsLetterRepository } from '~features/news_letter/domain/news_letter_repository'
import { Email } from '~features/shared/domain/value_objects/Email'
import {DeleteNewsLetter} from "~features/news_letter/application/delete_news_letter";

@Injectable()
export class RemoveNewsLetterService {

	constructor(private readonly repo : NewsLetterRepository) {}

	 async remove( email: string ): Promise<boolean> {
		return DeleteNewsLetter( this.repo, email )
	}
}
