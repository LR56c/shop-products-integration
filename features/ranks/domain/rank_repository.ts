import { Rank } from 'features/ranks/domain/rank'
import { ValidString } from 'features/shared/domain/value_objects/ValidString'

export abstract class RankRepository {
	abstract addRank(rank : Rank): Promise<boolean>
	abstract getAllRankByCode(code: ValidString): Promise<Rank[]>
}
