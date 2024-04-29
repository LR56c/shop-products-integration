import { RankNotFoundException } from '../domain/exceptions/rank_not_found_exception'
import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { InvalidStringException } from '../../shared/domain/exceptions/InvalidStringException'
import { ValidString } from '../../shared/domain/value_objects/ValidString'
import { wrapType } from '../../shared/utils/WrapType'
import { RankRepository } from '../domain/rank_repository'
import { ValidDecimal } from '../../shared/domain/value_objects/ValidDecimal'

export const CalculateAverageRankByCode = async ( repo: RankRepository, props: {
	code: string
} ): Promise<ValidDecimal> => {

	const codeResult = wrapType<ValidString, InvalidStringException>(
		() => ValidString.from( props.code ) )

	if ( codeResult instanceof BaseException ) {
		throw new InvalidStringException( 'code' )
	}

	const ranks = await repo.getAllRankByCode( codeResult as ValidString )

	if ( ranks.length === 0 ) {
		throw new RankNotFoundException()
	}

	const totalRank = ranks.reduce( ( acc, rank ) => acc + rank.value.value, 0 )

	const totalResult = wrapType<ValidDecimal, InvalidStringException>(
		() => ValidDecimal.from( totalRank / ranks.length ) )

	if ( totalResult instanceof BaseException ) {
		throw new InvalidStringException( 'total' )
	}

	return totalResult as ValidDecimal
}
