import { Errors } from '../../shared/domain/exceptions/errors'
import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { EmailException } from '../../shared/domain/exceptions/EmailException'
import { InvalidDateException } from '../../shared/domain/exceptions/InvalidDateException'
import { InvalidStringException } from '../../shared/domain/exceptions/InvalidStringException'
import { Email } from '../../shared/domain/value_objects/email'
import { ValidDate } from '../../shared/domain/value_objects/valid_date'
import { ValidString } from '../../shared/domain/value_objects/valid_string'
import {
	wrapType,
	wrapTypeAsync
} from '../../shared/utils/wrap_type'
import { NewsLetter } from '../domain/news_letter'
import { NewsLetterRepository } from '../domain/news_letter_repository'

export const AddNewsLetter = async (
	repo: NewsLetterRepository,
	props: {
		userEmail: string
		name: string
		createdAt: Date
	}
): Promise<boolean | Errors> => {

	const errors: BaseException[] = []

	const userEmailResult = wrapType<Email, EmailException>(
		() => Email.from( props.userEmail ) )

	if ( userEmailResult instanceof BaseException ) {
		errors.push( new EmailException( 'userEmail' ) )
	}

	const nameResult = wrapType<ValidString, InvalidStringException>(
		() => ValidString.from( props.name ) )

	if ( nameResult instanceof BaseException ) {
		errors.push( new InvalidStringException( 'name' ) )
	}

	const createdAtResult = wrapType<ValidDate, InvalidDateException>(
		() => ValidDate.from( props.createdAt ) )

	if ( createdAtResult instanceof BaseException ) {
		errors.push( new InvalidDateException( 'createdAt' ) )
	}

	if ( errors.length > 0 ) {
		return new Errors( errors )
	}

	const n = new NewsLetter(
		userEmailResult as Email,
		nameResult as ValidString,
		createdAtResult as ValidDate
	)

	const result = await wrapTypeAsync(()=>repo.add( n ))

	if( result instanceof BaseException ) {
		return new Errors([result])
	}

	return result
}
