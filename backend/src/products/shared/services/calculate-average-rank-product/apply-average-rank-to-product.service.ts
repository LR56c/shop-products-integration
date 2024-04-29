import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter'
import { ProductRepository } from '~features/products/domain/repository/product_repository'
import { ProductRankUpdateEvent } from '~features/shared/domain/events/product_rank_update_event'

@Injectable()
export class ApplyAverageRankToProductService {

	constructor(private repository: ProductRepository){
	}

	@OnEvent(ProductRankUpdateEvent.tag)
	handleEvent(payload: any) {
		// get by code (use case)
		// calculate average (use case)
		// update product (use case)
		console.log('payload', payload)
	}
}
