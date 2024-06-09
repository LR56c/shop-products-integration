import { Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { Discount } from 'packages/discount_type/domain/discount'
import { DiscountRepository } from 'packages/discount_type/domain/discount_repository'
import { Sale } from 'packages/discount_type/features/sales/domain/sale'
import { DiscountCreatedEvent } from 'packages/shared/domain/events/discount_created_event'

@Injectable()
export class CreateSaleService {
	constructor(
		private readonly repo: DiscountRepository,
		private eventEmitter: EventEmitter2
	)
	{}

	async createSale( discount: Discount ): Promise<boolean> {
		const result = await this.repo.create( discount )

		this.eventEmitter.emit( DiscountCreatedEvent.tag, {
			discount  : discount,
			product_id: ( discount as Sale ).product_id
		} )
		return result
	}
}
