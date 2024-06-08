import { Errors } from '../../shared/domain/exceptions/errors'
import { ValidString } from '../../shared/domain/value_objects/valid_string'
import {
	wrapType,
	wrapTypeErrors
} from '../../shared/utils/wrap_type'
import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { InvalidStringException } from '../../shared/domain/exceptions/InvalidStringException'
import { Rank } from '../domain/rank'
import { RankRepository } from '../domain/rank_repository'

export const GetRank = async ( repo: RankRepository, props: {
	code: string
	email: string
} ): Promise<Rank | Errors> => {
	const errors: BaseException[] = []
	const codeResult              = wrapType<ValidString, InvalidStringException>(
		() => ValidString.from( props.code ) )

	if ( codeResult instanceof BaseException ) {
		errors.push( new InvalidStringException( 'code' ) )
	}

	const emailResult = wrapType<ValidString, InvalidStringException>(
		() => ValidString.from( props.email ) )

	if ( emailResult instanceof BaseException ) {
		errors.push( new InvalidStringException( 'email' ) )
	}

	if ( errors.length > 0 ) {
		return new Errors( errors )
	}

	return await wrapTypeErrors( () => repo.getRank(
		emailResult as ValidString,
		codeResult as ValidString
	) )
}
