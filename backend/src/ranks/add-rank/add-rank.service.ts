import { Injectable } from '@nestjs/common';
import { AddRank } from '~features/ranks/application/add_rank'
import { RankRepository } from '~features/ranks/domain/rank_repository'

@Injectable()
export class AddRankService {
	constructor(private repo : RankRepository) {}

	async execute( code: string, rank: string ): Promise<boolean> {
		return AddRank( this.repo, { code, rank } )
	}
}
