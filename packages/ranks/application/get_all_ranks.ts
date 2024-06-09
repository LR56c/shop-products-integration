import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { Errors } from '../../shared/domain/exceptions/errors'
import { InvalidStringException } from '../../shared/domain/exceptions/InvalidStringException'
import { ValidString } from '../../shared/domain/value_objects/valid_string'
import {
	wrapType,
	wrapTypeErrors
} from '../../shared/utils/wrap_type'
import { Rank } from '../domain/rank'
import { RankRepository } from '../domain/rank_repository'

export const GetAllRanks = async ( repo: RankRepository, props: {
	code: string
} ): Promise<Rank[] | Errors> => {
	const codeResult = wrapType<ValidString, InvalidStringException>(
		() => ValidString.from( props.code ) )

	if ( codeResult instanceof BaseException ) {
		return new Errors( [ new InvalidStringException( 'code' ) ] )
	}

	return await wrapTypeErrors(
		() => repo.getAllRankByProductID( codeResult as ValidString ) )
}
