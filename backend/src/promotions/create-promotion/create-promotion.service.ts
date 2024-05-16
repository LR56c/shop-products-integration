import { Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { PromotionDto } from 'src/promotions/shared/promotion_dto'
import { DiscountRepository } from '~features/discount_type/domain/discount_repository'
import { CreatePromotion } from '~features/discount_type/features/promotions/application/create_promotion'
import { LinkProducts } from '~features/discount_type/features/promotions/application/link_products'
import { PromotionRepository } from '~features/discount_type/features/promotions/domain/promotion_repository'
import { DiscountCreatedEvent } from '~features/shared/domain/events/discount_created_event'
import { UUID } from '~features/shared/domain/value_objects/UUID'

@Injectable()
export class CreatePromotionService {
	constructor(
		private readonly discountRepo: DiscountRepository,
		private readonly promotionRepo: PromotionRepository,
		private eventEmitter: EventEmitter2
	)
	{}

	async execute(promotion : PromotionDto): Promise<boolean> {
		const p = await CreatePromotion( this.discountRepo, {
			id: promotion.id,
			name: promotion.name,
			percentage: promotion.percentage,
			creation_date: promotion.created_at,
			start_date: promotion.start_date,
			end_date: promotion.end_date,
			products: promotion.products
		})
		const lp = await LinkProducts( this.promotionRepo, {
			id: p.id.value,
			products: promotion.products
		} )
		for ( const l of lp ) {
			this.eventEmitter.emit( DiscountCreatedEvent.tag, {
				discount_id: p.id.value,
				product_id: l.product.value
			} )
		}
		return true
	}
}
