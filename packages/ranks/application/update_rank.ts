import { RankRepository } from '../domain/rank_repository'
import { Errors } from '../../shared/domain/exceptions/errors'
import { Email } from '../../shared/domain/value_objects/email'
import { ValidRank } from '../../shared/domain/value_objects/valid_rank'
import { ValidString } from '../../shared/domain/value_objects/valid_string'
import {
	wrapTypeDefault,
	wrapTypeErrors
} from '../../shared/utils/wrap_type'
import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { EmailException } from '../../shared/domain/exceptions/EmailException'
import { InvalidRankException } from '../../shared/domain/exceptions/InvalidRankException'
import { InvalidStringException } from '../../shared/domain/exceptions/InvalidStringException'
import { Rank } from '../domain/rank'

export const UpdateRank = async (repo : RankRepository, rank : Rank, props: {
	code?: string
	user_email?: string
	rank?: number
} ): Promise<boolean | Errors> => {
	const errors: BaseException[] = []

	const codeResult = wrapTypeDefault(
		rank.code,
		(value) => ValidString.from( value ),
		props.code
	)

	if ( codeResult instanceof BaseException ) {
		errors.push( new InvalidStringException( 'code' ) )
	}

	const rankResult = wrapTypeDefault(
		rank.value,
		(value) => ValidRank.from( value ),
		props.rank
	)

	if ( rankResult instanceof BaseException ) {
		errors.push( new InvalidRankException() )
	}

	const email = wrapTypeDefault(
		rank.user_email,
		(value) => Email.from( value ),
		props.user_email
	)

	if ( email instanceof BaseException ) {
		errors.push( new EmailException() )
	}

	if ( errors.length > 0 ) {
		return new Errors( errors )
	}

	const r = new Rank(
		email as Email,
		rank.createdAt,
		rankResult as ValidRank,
		codeResult as ValidString
	)

	return await wrapTypeErrors(()=> repo.updateRank(r))
}
