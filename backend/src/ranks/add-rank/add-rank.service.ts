import { Injectable } from '@nestjs/common';
import { Rank } from '~features/ranks/domain/rank'
import { RankRepository } from '~features/ranks/domain/rank_repository'

@Injectable()
export class AddRankService {
	constructor(private repo : RankRepository) {}

	async execute(rank : Rank): Promise<boolean> {
		return this.repo.addRank(rank)
	}
}
