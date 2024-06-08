import { Injectable } from '@nestjs/common'
import { CreateRankDto } from 'src/ranks/dto/create_rank_dto'
import { GetRank } from '~features/ranks/application/get_rank'
import { UpdateRank } from '~features/ranks/application/update_rank'
import { RankRepository } from '~features/ranks/domain/rank_repository'
import { Errors } from '~features/shared/domain/exceptions/errors'

@Injectable()
export class UpdateRankService {
	constructor( private repo: RankRepository ) {}

	async updateRank( rank: CreateRankDto ) {
		const savedRank = await GetRank( this.repo, {
			code : rank.product_code,
			email: rank.user_email
		} )

		if ( savedRank instanceof Errors ) {
			throw [ ...savedRank.values ]
		}


		const result = UpdateRank( this.repo, savedRank, {
			code      : rank.product_code,
			rank      : rank.value,
			user_email: rank.user_email
		} )

		if ( result instanceof Errors ) {
			throw [ ...result.values ]
		}

		return result
	}
}
