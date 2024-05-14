import { Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { DiscountRepository } from '~features/discount_type/domain/discount_repository'
import {
	PartialPromotionProduct,
	Promotion
} from '~features/discount_type/features/promotions/domain/promotion'
import { PromotionRepository } from '~features/discount_type/features/promotions/domain/promotion_repository'
import {
	DiscountCreatedEvent,
} from '~features/shared/domain/events/discount_created_event'

@Injectable()
export class CreatePromotionService {
	constructor(
		private readonly discountRepo: DiscountRepository,
		private readonly promotionRepo: PromotionRepository,
		private eventEmitter: EventEmitter2
	)
	{}

	async execute( promotion: Promotion,
		products: PartialPromotionProduct[] ): Promise<boolean> {
		await this.discountRepo.create( promotion )
		await this.promotionRepo.linkProducts( promotion.id, products )
		for ( const id of products ) {
			this.eventEmitter.emit( DiscountCreatedEvent.tag, {
				discount: promotion,
				product_id: id.product_id
			} )
		}
		return true
	}
}
