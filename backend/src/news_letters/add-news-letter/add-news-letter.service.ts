import { Injectable } from '@nestjs/common'
import { NewsLetterRepository } from '~features/news_letter/domain/news_letter_repository'
import {NewsLetterDto} from "../dto/news_letter_dto";
import {AddNewsLetter} from "~features/news_letter/application/add_news_letter";

@Injectable()
export class AddNewsLetterService {

	constructor( private readonly repo: NewsLetterRepository ) {}

	async addNewsLetter(props: NewsLetterDto): Promise<boolean> {
		return AddNewsLetter(this.repo, {
			userEmail: props.email,
			name: props.name,
			createdAt: props.created_at
		})
	}
}

