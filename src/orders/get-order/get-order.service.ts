import { Injectable } from '@nestjs/common'
import { GetOrder } from '../../../packages/orders/application/get_order'
import { OrderRepository } from '../../../packages/orders/domain/order_repository'
import { OrderResponse } from '../../../packages/orders/domain/order_response'
import { Errors } from '../../../packages/shared/domain/exceptions/errors'

@Injectable()
export class GetOrderService {
	constructor( private readonly repo: OrderRepository ) {}

	async getOrder( id: string ): Promise<OrderResponse> {
		const result = await  GetOrder( this.repo, id )

		if( result instanceof Errors ) {
			throw [...result.values]
		}

		return result
	}
}
