import { Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { CalculateAverageRankByCode } from '../../../packages/ranks/application/calculate_average_rank_by_code'
import { GetAllRanks } from '../../../packages/ranks/application/get_all_ranks'
import { RankRepository } from '../../../packages/ranks/domain/rank_repository'
import { ProductRankUpdateEvent } from '../../../packages/shared/domain/events/product_rank_update_event'
import { BaseException } from '../../../packages/shared/domain/exceptions/BaseException'
import { Errors } from '../../../packages/shared/domain/exceptions/errors'
import { InvalidUUIDException } from '../../../packages/shared/domain/exceptions/InvalidUUIDException'
import { UUID } from '../../../packages/shared/domain/value_objects/uuid'
import { ValidDecimal } from '../../../packages/shared/domain/value_objects/valid_decimal'
import { wrapType } from '../../../packages/shared/utils/wrap_type'

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

		const ranks = await GetAllRanks( this.repo, {
			code: id
		} )

		if ( ranks instanceof Errors ) {
			throw [ ...ranks.values ]
		}

		const result = await CalculateAverageRankByCode( this.repo, ranks )

		if ( result instanceof Errors ) {
			throw [ ...result.values ]
		}

		this.eventEmitter.emit( ProductRankUpdateEvent.tag, {
			product_id   : idResult,
			average_value: result
		} )

		return result
	}
}
