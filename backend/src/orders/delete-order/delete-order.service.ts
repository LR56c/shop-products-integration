import { Injectable } from '@nestjs/common';
import { OrderRepository } from '~features/orders/domain/order_repository'
import { UUID } from '~features/shared/domain/value_objects/UUID'

@Injectable()
export class DeleteOrderService {
	constructor(private readonly repo : OrderRepository) {}

	async deleteOrder(orderId : UUID): Promise<boolean> {
		return this.repo.deleteOrder( orderId )
	}
}
