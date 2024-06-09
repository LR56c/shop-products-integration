import { Injectable } from '@nestjs/common'
import { GetOrder } from 'packages/orders/application/get_order'
import { OrderRepository } from 'packages/orders/domain/order_repository'
import { OrderResponse } from 'packages/orders/domain/order_response'

@Injectable()
export class GetOrderService {
	constructor( private readonly repo: OrderRepository ) {}

	async getOrder( id: string ): Promise<OrderResponse> {
		return GetOrder( this.repo, id )
	}
}
