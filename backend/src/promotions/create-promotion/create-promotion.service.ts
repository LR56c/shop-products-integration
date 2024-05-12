import { Injectable } from '@nestjs/common'
import { DiscountRepository } from '~features/discount_type/domain/discount_repository'
import { Promotion } from '~features/discount_type/features/promotions/domain/promotion'
import { PromotionRepository } from '~features/discount_type/features/promotions/domain/promotion_repository'
import { UUID } from '~features/shared/domain/value_objects/UUID'

@Injectable()
export class CreatePromotionService {
	constructor(
		private readonly discountRepo: DiscountRepository,
		private readonly promotionRepo: PromotionRepository
	)
	{}

	async execute( promotion: Promotion,
		products_ids: UUID[] ): Promise<boolean> {
		await this.discountRepo.create( promotion )
		await this.promotionRepo.linkProducts( promotion.id, products_ids )
		return true
	}
}
