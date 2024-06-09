import { Injectable } from '@nestjs/common'
import { GetPromotion } from 'packages/discount_type/features/promotions/application/get_promotion'
import { PromotionRepository } from 'packages/discount_type/features/promotions/domain/promotion_repository'
import { PromotionResponse } from 'packages/discount_type/features/promotions/domain/promotion_response'

@Injectable()
export class GetPromotionService {
	constructor( private readonly repo: PromotionRepository ) {}

	async execute( id: string ): Promise<PromotionResponse> {
		return GetPromotion( this.repo, id )
	}
}
