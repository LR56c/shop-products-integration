import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { EmailException } from '../../shared/domain/exceptions/EmailException'
import { InvalidDateException } from '../../shared/domain/exceptions/InvalidDateException'
import { InvalidStringException } from '../../shared/domain/exceptions/InvalidStringException'
import { Email } from '../../shared/domain/value_objects/Email'
import { ValidDate } from '../../shared/domain/value_objects/ValidDate'
import { ValidString } from '../../shared/domain/value_objects/ValidString'
import { wrapType } from '../../shared/utils/WrapType'
import { NewsLetter } from '../domain/news_letter'
import { NewsLetterRepository } from '../domain/news_letter_repository'

export const AddNewsLetter = async (
	repo: NewsLetterRepository,
	props: {
		userEmail: string
		name: string
		createdAt: Date
	}
): Promise<boolean> => {

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
		throw errors
	}

	const n = new NewsLetter(
		userEmailResult as Email,
		nameResult as ValidString,
		createdAtResult as ValidDate
	)

	await repo.add( n )
	return true
}
