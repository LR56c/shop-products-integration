import { UUID } from '../../shared/domain/value_objects/UUID'
import { DataNotFoundException } from '../../shared/infrastructure/data_not_found_exception'
import { InvalidRankException } from '../../shared/domain/exceptions/InvalidRankException'
import { ValidRank } from '../../shared/domain/value_objects/ValidRank'
import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { wrapType } from '../../shared/utils/WrapType'
import { RankRepository } from '../domain/rank_repository'

export const CalculateAverageRankByCode = async ( repo: RankRepository,
	id: UUID ): Promise<ValidRank> => {


	const ranks = await repo.getAllRankByProductID( id )

	if ( ranks.length === 0 ) {
		throw [ new DataNotFoundException() ]
	}

	const totalRank = ranks.reduce( ( acc, rank ) => acc + rank.value.value, 0 )

	const totalResult = wrapType<ValidRank, InvalidRankException>(
		() => ValidRank.from( totalRank / ranks.length ) )

	if ( totalResult instanceof BaseException ) {
		throw [ new InvalidRankException( 'total' ) ]
	}

	return totalResult as ValidRank
}
