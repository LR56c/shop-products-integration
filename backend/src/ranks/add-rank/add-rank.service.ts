import { Injectable } from '@nestjs/common'
import { AddRank } from '~features/ranks/application/add_rank'
import { RankRepository } from '~features/ranks/domain/rank_repository'
import { RankDto } from '../dto/rank_dto'

@Injectable()
export class AddRankService {
	constructor( private repo: RankRepository ) {}

	async execute( props: RankDto ): Promise<boolean> {
		return AddRank( this.repo, {
			code      : props.code,
			user_email: props.user_email,
			rank      : props.rank
		} )
	}
}
