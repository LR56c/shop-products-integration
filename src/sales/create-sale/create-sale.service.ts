import { Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { DiscountRepository } from '../../../packages/discount_type/domain/discount_repository'
import { CreateSale } from '../../../packages/discount_type/features/sales/application/create_sale'
import { DiscountCreatedEvent } from '../../../packages/shared/domain/events/discount_created_event'
import { Errors } from '../../../packages/shared/domain/exceptions/errors'
import { SaleDto } from '../shared/sale_dto'

@Injectable()
export class CreateSaleService {
	constructor(
		private readonly repo: DiscountRepository,
		private eventEmitter: EventEmitter2
	)
	{}

	async createSale( discount: SaleDto ): Promise<boolean> {
		const result = await CreateSale( this.repo, {
			creation_date: discount.created_at,
			end_date     : discount.end_date,
			product_id   : discount.product_id,
			percentage   : discount.percentage,
			start_date   : discount.start_date,
			id           : discount.id
		} )

		if ( result instanceof Errors ) {
			throw [ ...result.values ]
		}

		this.eventEmitter.emit( DiscountCreatedEvent.tag, {
			discount  : discount,
			product_id: result.product_id
		} )

		return true
	}
}
