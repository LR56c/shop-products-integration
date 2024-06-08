import { Injectable } from '@nestjs/common'
import { GetAllRanks } from '~features/ranks/application/get_all_ranks'
import { Rank } from '~features/ranks/domain/rank'
import { RankRepository } from '~features/ranks/domain/rank_repository'
import { Errors } from '~features/shared/domain/exceptions/errors'

@Injectable()
export class GetAllRankByCodeService {
	constructor( private repo: RankRepository ) {}

	async execute( code: string ): Promise<Rank[]> {
		const result = await GetAllRanks( this.repo, { code } )

		if(result instanceof Errors) {
			throw [result.values]
		}
		return result
	}
}
