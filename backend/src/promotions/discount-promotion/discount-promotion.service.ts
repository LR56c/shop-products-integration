import { Injectable } from '@nestjs/common'
import { GetDiscountPromotions } from '~features/discount_type/features/promotions/application/discount_promotion'
import {
	PartialPromotionProduct,
	Promotion
} from '~features/discount_type/features/promotions/domain/promotion'
import { PromotionRepository } from '~features/discount_type/features/promotions/domain/promotion_repository'

@Injectable()
export class DiscountPromotionService {
	constructor(
		private readonly repo: PromotionRepository
	)
	{}

	async execute( products: Map<string, PartialPromotionProduct> ): Promise<Promotion[]> {
		return GetDiscountPromotions( this.repo, products )
	}
}
