import { Injectable } from '@nestjs/common'
import { RankRepository } from '~features/ranks/domain/rank_repository'
import {UpdateRankDto} from "./update_rank_dto";
import {UpdateRank} from "~features/ranks/application/update_rank";

@Injectable()
export class UpdateRankService {
	constructor( private repo: RankRepository ) {}

	async updateRank( props: UpdateRankDto ) {
		return UpdateRank( this.repo, {
			code      : props.code,
			user_email: props.user_email,
			rank      : props.rank,
		} )
	}
}
