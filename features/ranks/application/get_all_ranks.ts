import { Rank } from '../domain/rank'
import { RankRepository } from '../domain/rank_repository'
import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { InvalidStringException } from '../../shared/domain/exceptions/InvalidStringException'
import { ValidString } from '../../shared/domain/value_objects/ValidString'
import { wrapType } from '../../shared/utils/WrapType'

export const GetAllRanks = async ( repo: RankRepository, props: {
	code: string
} ): Promise<Rank[]> => {
	const errors: BaseException[] = []

	const codeResult = wrapType<ValidString, InvalidStringException>(
		() => ValidString.from( props.code ) )

	if ( codeResult instanceof BaseException ) {
		errors.push( new InvalidStringException( 'code' ) )
	}

	if ( errors.length > 0 ) {
		throw errors
	}

	return await repo.getAllRankByProductID( codeResult as ValidString )
}
