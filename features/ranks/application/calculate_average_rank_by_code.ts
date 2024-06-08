import { Rank } from '../domain/rank'
import { Errors } from '../../shared/domain/exceptions/errors'
import { ValidRank } from '../../shared/domain/value_objects/valid_rank'
import { wrapType } from '../../shared/utils/wrap_type'
import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { InvalidRankException } from '../../shared/domain/exceptions/InvalidRankException'
import { RankRepository } from '../domain/rank_repository'

export const CalculateAverageRankByCode = async ( repo: RankRepository,
	ranks : Rank[] ): Promise<ValidRank | Errors> => {

	const totalRank = ranks.reduce( ( acc, rank ) => acc + rank.value.value, 0 )

	const totalResult = wrapType<ValidRank, InvalidRankException>(
		() => ValidRank.from( totalRank / ranks.length ) )

	if ( totalResult instanceof BaseException ) {
		return new Errors([new InvalidRankException( 'total' )])
	}

	return totalResult as ValidRank
}
