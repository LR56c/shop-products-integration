import { Email } from '../../shared/domain/value_objects/email'
import { UUID } from '../../shared/domain/value_objects/uuid'
import { ValidString } from '../../shared/domain/value_objects/valid_string'
import { Rank } from './rank'

export abstract class RankRepository {
	abstract addRank( rank: Rank ): Promise<boolean>

	abstract updateRank( rank: Rank ): Promise<boolean>

	abstract getAllRankByProductID( id: UUID ): Promise<Rank[]>
	abstract getRank(
		user_email: Email,
		code: ValidString
	): Promise<Rank>
}
