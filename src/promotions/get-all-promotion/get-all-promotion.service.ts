import { Injectable } from '@nestjs/common'
import { GetAllPromotions } from 'packages/discount_type/features/promotions/application/get_all_promotions'
import { PromotionRepository } from 'packages/discount_type/features/promotions/domain/promotion_repository'
import { PromotionResponse } from 'packages/discount_type/features/promotions/domain/promotion_response'
import { Errors } from 'packages/shared/domain/exceptions/errors'

@Injectable()
export class GetAllPromotionService {
	constructor( private readonly repo: PromotionRepository ) {}

	async execute( from: number, to: number, name?: string,
		from_date?: string, to_date?: string ): Promise<PromotionResponse[]> {
		const result = await GetAllPromotions( this.repo, {
			from,
			to,
			name,
			from_date,
			to_date
		} )

		if ( result instanceof Errors ) {
			throw [ ...result.values ]
		}
		return result
	}
}
