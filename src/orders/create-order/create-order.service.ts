import { Injectable } from '@nestjs/common'
import { CreateOrder } from 'packages/orders/application/create_order'
import { OrderRepository } from 'packages/orders/domain/order_repository'
import { CreateOrderDto } from 'src/orders/shared/dto/create_order_dto'

@Injectable()
export class CreateOrderService {
	constructor( private readonly repo: OrderRepository ) {}

	async createOrder( order: CreateOrderDto ): Promise<boolean> {
		return CreateOrder( this.repo, {
			id                : order.id,
			client_email      : order.client_email,
			payment_id        : order.payment_id,
			products          : order.products,
			seller_email      : order.seller_email,
			order_confirmed_id: order.order_confirmed_id,
			item_confirmed_id : order.item_confirmed_id
		} )
	}
}