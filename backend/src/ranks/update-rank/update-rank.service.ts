import { Injectable } from '@nestjs/common'
import { Rank } from '~features/ranks/domain/rank'
import { RankRepository } from '~features/ranks/domain/rank_repository'

@Injectable()
export class UpdateRankService {
	constructor( private repo: RankRepository ) {}

	async updateRank( rank: Rank ) {
		return this.repo.updateRank( rank )
	}
}
