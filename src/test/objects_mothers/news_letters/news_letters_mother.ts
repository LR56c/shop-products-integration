import { EmailMother } from '../shared/email_mother'
import { ValidDateMother } from '../shared/valid_date_mother'
import { ValidStringMother } from '../shared/valid_string_mother'
import { NewsLetter } from '../../../../packages/news_letter/domain/news_letter'

export class NewsLettersMother{
	static random(): NewsLetter {
		return new NewsLetter(
			EmailMother.random(),
			ValidStringMother.random(),
			ValidDateMother.randomNearPast()
		)
	}

	static invalid(): NewsLetter {
		return new NewsLetter(
			EmailMother.invalid(),
			ValidStringMother.invalid(),
			ValidDateMother.invalid()
		)
	}
}
