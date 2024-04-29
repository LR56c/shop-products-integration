import { Injectable } from '@nestjs/common';
import { GetAllRanks } from '~features/ranks/application/get_all_ranks'
import { Rank } from '~features/ranks/domain/rank'
import { RankRepository } from '~features/ranks/domain/rank_repository'

@Injectable()
export class GetAllRankByCodeService {
	constructor(private repo : RankRepository) {}
	async execute( code: string ): Promise<Rank[]> {
		return GetAllRanks( this.repo, { code } )
	}
}
