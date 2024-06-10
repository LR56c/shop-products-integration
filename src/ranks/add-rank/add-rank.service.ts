import { Injectable } from '@nestjs/common'
import { AddRank } from '../../../packages/ranks/application/add_rank'
import { RankRepository } from '../../../packages/ranks/domain/rank_repository'
import { Errors } from '../../../packages/shared/domain/exceptions/errors'
import { CreateRankDto } from '../dto/create_rank_dto'

@Injectable()
export class AddRankService {
	constructor( private repo: RankRepository ) {}

	async execute( rank: CreateRankDto ): Promise<boolean> {
		const rankResult = await AddRank( this.repo, {
			code      : rank.product_code,
			rank      : rank.value,
			user_email: rank.user_email
		} )

		if ( rankResult instanceof Errors ) {
			throw [ ...rankResult.values ]
		}

		return true
	}
}
