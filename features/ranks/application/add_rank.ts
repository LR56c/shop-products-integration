import { RankRepository } from '../domain/rank_repository'
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
import {
	wrapType,
	wrapTypeErrors
} from '../../shared/utils/wrap_type'

export const AddRank = async (repo : RankRepository, props: {
	code: string
	user_email: string
	rank: number
} ): Promise<boolean | Errors> => {
	const errors: BaseException[] = []

	const codeResult = wrapType<ValidString, InvalidStringException>(
		() => ValidString.from( props.code ) )

	if ( codeResult instanceof BaseException ) {
		errors.push( new InvalidStringException( 'code' ) )
	}

	const rankResult = wrapType<ValidRank, InvalidRankException>(
		() => ValidRank.from( props.rank ) )

	if ( rankResult instanceof BaseException ) {
		errors.push( new InvalidRankException() )
	}

	const dateResult = wrapType<ValidDate, InvalidDateException>(
		() => ValidDate.from( new Date() ) )

	if ( dateResult instanceof BaseException ) {
		errors.push( new InvalidDateException( 'created_at' ) )
	}

	const email = wrapType<Email, EmailException>(
		() => Email.from( props.user_email ) )

	if ( email instanceof BaseException ) {
		errors.push( new EmailException() )
	}

	if ( errors.length > 0 ) {
		return new Errors( errors )
	}

	const r = new Rank(
		email as Email,
		dateResult as ValidDate,
		rankResult as ValidRank,
		codeResult as ValidString
	)

	return await wrapTypeErrors(()=> repo.addRank(r))
}
