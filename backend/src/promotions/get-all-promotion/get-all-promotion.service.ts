import { Injectable } from '@nestjs/common'
import { GetAllPromotions } from '~features/discount_type/features/promotions/application/get_all_promotions'
import { PromotionRepository } from '~features/discount_type/features/promotions/domain/promotion_repository'
import { PromotionResponse } from '~features/discount_type/features/promotions/domain/promotion_response'

@Injectable()
export class GetAllPromotionService {
	constructor( private readonly repo: PromotionRepository ) {}

	async execute( from: number, to: number, name?: string,
		from_date?: string, to_date?: string ): Promise<PromotionResponse[]> {
		return await GetAllPromotions( this.repo, {
			from,
			to,
			name,
			from_date,
			to_date
		} )
	}
}
