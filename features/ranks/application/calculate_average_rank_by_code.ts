import { InvalidRankException } from '../../shared/domain/exceptions/InvalidRankException'
import { ValidRank } from '../../shared/domain/value_objects/ValidRank'
import { RankNotFoundException } from '../domain/exceptions/rank_not_found_exception'
import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { ValidString } from '../../shared/domain/value_objects/ValidString'
import { wrapType } from '../../shared/utils/WrapType'
import { RankRepository } from '../domain/rank_repository'

export const CalculateAverageRankByCode = async ( repo: RankRepository, code: ValidString): Promise<ValidRank> => {


	const ranks = await repo.getAllRankByCode( code )

	if ( ranks.length === 0 ) {
		throw new RankNotFoundException()
	}

	const totalRank = ranks.reduce( ( acc, rank ) => acc + rank.value.value, 0 )

	const totalResult = wrapType<ValidRank, InvalidRankException>(
		() => ValidRank.from( totalRank / ranks.length ) )

	if ( totalResult instanceof BaseException ) {
		throw new InvalidRankException( 'total' )
	}

	return totalResult as ValidRank
}
