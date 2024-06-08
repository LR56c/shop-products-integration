import { Injectable } from '@nestjs/common'
import { CreateRankDto } from 'src/ranks/dto/create_rank_dto'
import { AddRank } from '~features/ranks/application/add_rank'
import { RankRepository } from '~features/ranks/domain/rank_repository'
import { Errors } from '~features/shared/domain/exceptions/errors'

@Injectable()
export class AddRankService {
	constructor( private repo: RankRepository ) {}

	async execute( rank: CreateRankDto ): Promise<boolean> {
		const rankResult = await AddRank( this.repo,{
			code		 : rank.product_code,
			rank		 : rank.value,
			user_email: rank.user_email
		} )

		if ( rankResult instanceof Errors ) {
			throw [...rankResult.values]
		}

		return true
	}
}
