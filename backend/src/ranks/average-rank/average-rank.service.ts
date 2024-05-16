import { Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { CalculateAverageRankByCode } from '~features/ranks/application/calculate_average_rank_by_code'
import { RankRepository } from '~features/ranks/domain/rank_repository'
import { ProductRankUpdateEvent } from '~features/shared/domain/events/product_rank_update_event'
import { BaseException } from '~features/shared/domain/exceptions/BaseException'
import { InvalidUUIDException } from '~features/shared/domain/exceptions/InvalidUUIDException'
import { UUID } from '~features/shared/domain/value_objects/UUID'
import { ValidDecimal } from '~features/shared/domain/value_objects/ValidDecimal'
import { wrapType } from '~features/shared/utils/WrapType'

@Injectable()
export class AverageRankService {
	constructor( private repo: RankRepository,
		private eventEmitter: EventEmitter2 )
	{}

	async execute( id: string ): Promise<ValidDecimal> {
		const idResult = wrapType<UUID, InvalidUUIDException>(
			() => UUID.from( id ) )

		if ( idResult instanceof BaseException ) {
			throw [ idResult ]
		}

		const result = await CalculateAverageRankByCode( this.repo, idResult as UUID)

		this.eventEmitter.emit( ProductRankUpdateEvent.tag, {
			product_id : idResult,
			average_value: result
		} )

		return result
	}
}
