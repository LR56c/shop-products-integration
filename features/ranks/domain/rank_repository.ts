import { UUID } from '../../shared/domain/value_objects/UUID'
import { Rank } from './rank'

export abstract class RankRepository {
	abstract addRank(rank : Rank): Promise<boolean>
	abstract updateRank(rank : Rank): Promise<boolean>
	abstract getAllRankByProductID(id : UUID): Promise<Rank[]>
}
