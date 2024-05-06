import { Injectable } from '@nestjs/common'
import {
	PartialOrder
} from '~features/orders/domain/order'
import { OrderRepository } from '~features/orders/domain/order_repository'
import { UUID } from '~features/shared/domain/value_objects/UUID'

@Injectable()
export class UpdateOrderService {
	constructor( private readonly repo: OrderRepository ) {}

	async updateOrder(id: UUID, order : PartialOrder): Promise<boolean> {
		return this.repo.updateOrder(id,order)
	}
}
