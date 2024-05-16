import { Injectable } from '@nestjs/common'
import { GetOrder } from '~features/orders/application/get_order'
import { OrderRepository } from '~features/orders/domain/order_repository'
import { OrderResponse } from '~features/orders/domain/order_response'

@Injectable()
export class GetOrderService {
	constructor( private readonly repo: OrderRepository ) {}

	async getOrder( id : string ): Promise<OrderResponse> {
		return GetOrder( this.repo, id  )
	}
}
