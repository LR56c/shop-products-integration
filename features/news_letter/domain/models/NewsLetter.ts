import { wrapType } from '../../../shared/utils/WrapType'
import { EmailException } from '../../../shared/domain/exceptions/EmailException'
import { InvalidDateException } from '../../../shared/domain/exceptions/InvalidDateException'
import { InvalidStringException } from '../../../shared/domain/exceptions/InvalidStringException'
import { Email } from '../../../shared/domain/value_objects/Email'
import { ValidDate } from '../../../shared/domain/value_objects/ValidDate'
import { ValidString } from '../../../shared/domain/value_objects/ValidString'


export class NewsLetter {
	private constructor(
		readonly userEmail: Email,
		readonly name: ValidString,
		readonly createdAt: ValidDate
	)
	{}

	/**
	 * Create a Newsletter instance
	 * @throws {InvalidStringException} - if string is invalid
	 * @throws {EmailException} - if string is invalid
	 * @throws {InvalidDateException} - if date is invalid
	 */
	static from( props: {
		email: string,
		name: string,
		createdAt: Date
	} ): NewsLetter {
		const errors: Error[] = []

		const email = wrapType<Email, EmailException>(
			() => Email.from( props.email ) )

		if ( email instanceof Error ) {
			errors.push( email )
		}

		const name = wrapType<ValidString, InvalidStringException>(
			() => ValidString.from( props.name ) )

		if ( name instanceof Error ) {
			errors.push( name )
		}

		const createdAt = wrapType<ValidDate, InvalidDateException>(
			() => ValidDate.from( props.createdAt ) )

		if ( createdAt instanceof Error ) {
			errors.push( createdAt )
		}

		if ( errors.length > 0 ) {
			throw errors
		}

		return new NewsLetter(
			email as Email,
			name as ValidString,
			createdAt as ValidDate
		)
	}
}
