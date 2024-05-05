import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { EmailException } from '../../shared/domain/exceptions/EmailException'
import { InvalidDateException } from '../../shared/domain/exceptions/InvalidDateException'
import { InvalidStringException } from '../../shared/domain/exceptions/InvalidStringException'
import { Email } from '../../shared/domain/value_objects/Email'
import { ValidDate } from '../../shared/domain/value_objects/ValidDate'
import { ValidString } from '../../shared/domain/value_objects/ValidString'
import { wrapType } from '../../shared/utils/WrapType'
import { NewsLetter } from '../domain/news_letter'

export function newsLetterToJson( news_letter: NewsLetter ): Record<string, any> {
	return {
		email: news_letter.userEmail.value,
		name      : news_letter.name.value,
		created_at: news_letter.createdAt.value
	}
}

export function newsLetterFromJson( json: Record<string, any> ): NewsLetter | BaseException[] {
	const errors: BaseException[] = []

	const userEmail = wrapType<Email, EmailException>(
		() => Email.from( json.email ) )

	if ( userEmail instanceof BaseException ) {
		errors.push( new EmailException() )
	}

	const name = wrapType<ValidString, InvalidStringException>(
		() => ValidString.from( json.name ) )

	if ( name instanceof BaseException ) {
		errors.push( new InvalidStringException( 'name' ) )
	}

	const createdAt = wrapType<ValidDate, InvalidDateException>(
		() => ValidDate.from( json.created_at ) )

	if ( createdAt instanceof BaseException ) {
		errors.push( new InvalidDateException( 'created_at' ) )
	}

	if ( errors.length > 0 ) {
		return errors
	}

	return new NewsLetter(
		userEmail as Email,
		name as ValidString,
		createdAt as ValidDate )
}
