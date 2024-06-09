import { Errors } from '../../shared/domain/exceptions/errors'
import { EmailException } from '../../shared/domain/exceptions/EmailException'
import { Email } from '../../shared/domain/value_objects/email'
import { Rank } from '../domain/rank'
import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { InvalidDateException } from '../../shared/domain/exceptions/InvalidDateException'
import { InvalidRankException } from '../../shared/domain/exceptions/InvalidRankException'
import { InvalidStringException } from '../../shared/domain/exceptions/InvalidStringException'
import { ValidDate } from '../../shared/domain/value_objects/valid_date'
import { ValidRank } from '../../shared/domain/value_objects/valid_rank'
import { ValidString } from '../../shared/domain/value_objects/valid_string'
import { wrapType } from '../../shared/utils/wrap_type'

export function rankToJson( rank: Rank ): Record<string, any> {
	return {
		created_at  : rank.createdAt.value,
		value       : rank.value.value,
		product_code: rank.code.value,
		user_email  : rank.user_email.value
	}
}

export function rankFromJson( rank: Record<string, any> ): Rank | Errors {
	const errors: BaseException[] = []

	const createdAt = wrapType<ValidDate, InvalidDateException>(
		() => ValidDate.from( rank.created_at ) )

	if ( createdAt instanceof BaseException ) {
		errors.push( new InvalidDateException( 'created_at' ) )
	}

	const value = wrapType<ValidRank, InvalidRankException>(
		() => ValidRank.from( rank.value ) )

	if ( value instanceof BaseException ) {
		errors.push( new InvalidRankException() )
	}

	const code = wrapType<ValidString, InvalidStringException>(
		() => ValidString.from( rank.product_code ) )

	if ( code instanceof BaseException ) {
		errors.push( new InvalidStringException( 'product_code' ) )
	}

	const email = wrapType<Email, EmailException>(
		() => Email.from( rank.user_email ) )

	if ( email instanceof BaseException ) {
		errors.push( new EmailException() )
	}

	if ( errors.length > 0 ) {
		return new Errors(errors)
	}

	return new Rank(
		email as Email,
		createdAt as ValidDate,
		value as ValidRank,
		code as ValidString
	)
}
