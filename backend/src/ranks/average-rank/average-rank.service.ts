import { Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { CalculateAverageRankByCode } from '~features/ranks/application/calculate_average_rank_by_code'
import { RankRepository } from '~features/ranks/domain/rank_repository'
import { ProductRankUpdateEvent } from '~features/shared/domain/events/product_rank_update_event'
import { ValidDecimal } from '~features/shared/domain/value_objects/ValidDecimal'
import { ValidString } from '~features/shared/domain/value_objects/ValidString'

@Injectable()
export class AverageRankService {
	constructor( private repo: RankRepository,
		private eventEmitter: EventEmitter2 )
	{}

	async execute( code: ValidString ): Promise<ValidDecimal> {
		const result = await CalculateAverageRankByCode( this.repo, code)

		this.eventEmitter.emit( ProductRankUpdateEvent.tag, {
			product_code : code,
			average_value: result
		} )

		return result
	}
}
