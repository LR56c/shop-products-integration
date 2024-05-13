import { Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { DiscountRepository } from '~features/discount_type/domain/discount_repository'
import { Promotion } from '~features/discount_type/features/promotions/domain/promotion'
import { PromotionRepository } from '~features/discount_type/features/promotions/domain/promotion_repository'
import {
	DiscountCreatedEvent,
} from '~features/shared/domain/events/discount_created_event'
import { UUID } from '~features/shared/domain/value_objects/UUID'

@Injectable()
export class CreatePromotionService {
	constructor(
		private readonly discountRepo: DiscountRepository,
		private readonly promotionRepo: PromotionRepository,
		private eventEmitter: EventEmitter2
	)
	{}

	async execute( promotion: Promotion,
		products_ids: UUID[] ): Promise<boolean> {
		await this.discountRepo.create( promotion )
		await this.promotionRepo.linkProducts( promotion.id, products_ids )
		for ( const id of products_ids ) {
			this.eventEmitter.emit( DiscountCreatedEvent.tag, {
				discount: promotion,
				product_id: id
			} )
		}
		return true
	}
}
