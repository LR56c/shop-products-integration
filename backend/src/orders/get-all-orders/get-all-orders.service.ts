import { Injectable } from '@nestjs/common'
import { GetAllOrders } from '~features/orders/application/get_all_orders'
import { OrderRepository } from '~features/orders/domain/order_repository'
import { OrderResponse } from '~features/orders/domain/order_response'

@Injectable()
export class GetAllOrdersService {
	constructor( private readonly repo: OrderRepository ) {}

	async getAllOrders( from: number, to: number,
		email ?: string ): Promise<OrderResponse[]> {
		return GetAllOrders( this.repo, { from, to, email } )
	}
}
