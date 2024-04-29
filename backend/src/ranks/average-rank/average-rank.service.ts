import { Injectable } from '@nestjs/common';
import { CalculateAverageRankByCode } from '~features/ranks/application/calculate_average_rank_by_code'
import { RankRepository } from '~features/ranks/domain/rank_repository'
import { ValidDecimal } from '~features/shared/domain/value_objects/ValidDecimal'

@Injectable()
export class AverageRankService {
	constructor(private repo : RankRepository) {}

	async execute( code: string ): Promise<ValidDecimal> {
		return CalculateAverageRankByCode( this.repo, { code } )
	}
}
