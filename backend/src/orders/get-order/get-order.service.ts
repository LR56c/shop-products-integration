import { Injectable } from '@nestjs/common'
import { Order } from '~features/orders/domain/order'
import { OrderRepository } from '~features/orders/domain/order_repository'
import { UUID } from '~features/shared/domain/value_objects/UUID'

@Injectable()
export class GetOrderService {
	constructor( private readonly repo: OrderRepository ) {}

	async getOrder( orderId: UUID ): Promise<Order> {
		return this.repo.getOrder( orderId )
	}
}
