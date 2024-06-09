import { Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { Errors } from 'packages/shared/domain/exceptions/errors'
import { PromotionDto } from 'src/promotions/shared/promotion_dto'
import { DiscountRepository } from 'packages/discount_type/domain/discount_repository'
import { CreatePromotion } from 'packages/discount_type/features/promotions/application/create_promotion'
import { LinkProducts } from 'packages/discount_type/features/promotions/application/link_products'
import { PromotionRepository } from 'packages/discount_type/features/promotions/domain/promotion_repository'
import { DiscountCreatedEvent } from 'packages/shared/domain/events/discount_created_event'

@Injectable()
export class CreatePromotionService {
	constructor(
		private readonly discountRepo: DiscountRepository,
		private readonly promotionRepo: PromotionRepository,
		private eventEmitter: EventEmitter2
	)
	{}

	async execute( promotion: PromotionDto ): Promise<boolean> {
		const p = await CreatePromotion( this.discountRepo, {
			id           : promotion.id,
			name         : promotion.name,
			percentage   : promotion.percentage,
			creation_date: promotion.created_at,
			start_date   : promotion.start_date,
			end_date     : promotion.end_date,
			products     : promotion.products
		} )

		if ( p instanceof Errors ) {
			throw [ ...p.values ]
		}

		const lp = await LinkProducts( this.promotionRepo, {
			id      : p.id.value,
			products: promotion.products
		} )

		if ( lp instanceof Errors ) {
			throw [ ...lp.values ]
		}

		for ( const l of lp ) {
			this.eventEmitter.emit( DiscountCreatedEvent.tag, {
				discount_id: p.id.value,
				product_id : l.product.value
			} )
		}
		return true
	}
}
