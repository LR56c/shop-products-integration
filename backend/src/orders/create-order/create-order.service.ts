import { Injectable } from '@nestjs/common'
import {
	PartialOrder
} from '~features/orders/domain/order'
import { OrderRepository } from '~features/orders/domain/order_repository'

@Injectable()
export class CreateOrderService {
	constructor( private readonly repo: OrderRepository ) {}

	async createOrder(order : PartialOrder): Promise<boolean> {
		return this.repo.createOrder(order)
	}

}
