import { Rank } from './rank'
import { ValidString } from '../../shared/domain/value_objects/ValidString'

export abstract class RankRepository {
	abstract addRank(rank : Rank): Promise<boolean>
	abstract updateRank(rank : Rank): Promise<boolean>
	abstract getAllRankByCode(code: ValidString): Promise<Rank[]>
}
