import { Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { CalculateAverageRankByCode } from '~features/ranks/application/calculate_average_rank_by_code'
import { GetAllRanks } from '~features/ranks/application/get_all_ranks'
import { RankRepository } from '~features/ranks/domain/rank_repository'
import { ProductRankUpdateEvent } from '~features/shared/domain/events/product_rank_update_event'
import { BaseException } from '~features/shared/domain/exceptions/BaseException'
import { Errors } from '~features/shared/domain/exceptions/errors'
import { InvalidUUIDException } from '~features/shared/domain/exceptions/InvalidUUIDException'
import { UUID } from '~features/shared/domain/value_objects/uuid'
import { ValidDecimal } from '~features/shared/domain/value_objects/valid_decimal'
import {
	wrapType,
} from '~features/shared/utils/wrap_type'

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
		})

		if ( ranks instanceof Errors) {
			throw [...ranks.values]
		}

		const result = await CalculateAverageRankByCode( this.repo, ranks )

		if ( result instanceof Errors ) {
			throw [...result.values]
		}

		this.eventEmitter.emit( ProductRankUpdateEvent.tag, {
			product_id   : idResult,
			average_value: result
		} )

		return result
	}
}
