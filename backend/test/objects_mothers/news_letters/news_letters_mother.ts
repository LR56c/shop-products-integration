import { EmailMother } from 'test/objects_mothers/shared/email_mother'
import { ValidDateMother } from 'test/objects_mothers/shared/valid_date_mother'
import { ValidStringMother } from 'test/objects_mothers/shared/valid_string_mother'
import { NewsLetter } from '~features/news_letter/domain/news_letter'

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
