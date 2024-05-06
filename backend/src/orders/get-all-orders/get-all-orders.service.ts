import { Injectable } from '@nestjs/common';
import { Order } from '~features/orders/domain/order'
import { OrderRepository } from '~features/orders/domain/order_repository'
import { Email } from '~features/shared/domain/value_objects/Email'
import { ValidInteger } from '~features/shared/domain/value_objects/ValidInteger'

@Injectable()
export class GetAllOrdersService {
	constructor(private readonly repo : OrderRepository) {}

	async getAllOrders( from: ValidInteger, to: ValidInteger,
		client_email ?: Email ): Promise<Order[]> {
		return this.repo.getAll(from, to, client_email)
	}
}
