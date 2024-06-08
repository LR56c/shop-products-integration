import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { EmailException } from '../../shared/domain/exceptions/EmailException'
import { InvalidDateException } from '../../shared/domain/exceptions/InvalidDateException'
import { InvalidRankException } from '../../shared/domain/exceptions/InvalidRankException'
import { InvalidStringException } from '../../shared/domain/exceptions/InvalidStringException'
import { Email } from '../../shared/domain/value_objects/Email'
import { ValidDate } from '../../shared/domain/value_objects/ValidDate'
import { ValidRank } from '../../shared/domain/value_objects/ValidRank'
import { ValidString } from '../../shared/domain/value_objects/ValidString'
import { wrapType } from '../../shared/utils/WrapType'
import { Rank } from '../domain/rank'

export function rankToJson( rank: Rank ): Record<string, any> {
	return {
		created_at  : rank.createdAt.value,
		value       : rank.value.value,
		product_code: rank.code.value,
		user_email  : rank.user_email.value
	}
}

export function rankFromJson( rank: Record<string, any> ): Rank | BaseException[] {
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
		return errors
	}

	return new Rank(
		email as Email,
		createdAt as ValidDate,
		value as ValidRank,
		code as ValidString
	)
}
