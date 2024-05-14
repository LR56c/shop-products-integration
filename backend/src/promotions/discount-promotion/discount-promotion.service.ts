import { Injectable } from '@nestjs/common'
import { GetDiscountPromotions } from '~features/discount_type/features/promotions/application/discount_promotion'
import { Promotion } from '~features/discount_type/features/promotions/domain/promotion'
import { PromotionRepository } from '~features/discount_type/features/promotions/domain/promotion_repository'
import { UUID } from '~features/shared/domain/value_objects/UUID'

@Injectable()
export class DiscountPromotionService {
	constructor(
		private readonly repo: PromotionRepository
	)
	{}

	async execute( products: Map<string, UUID> ): Promise<Promotion[]> {
		return GetDiscountPromotions( this.repo, products )
	}
}
