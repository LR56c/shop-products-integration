import { Injectable } from '@nestjs/common'
import { CreateOrderDto } from 'src/orders/shared/dto/create_order_dto'
import { CreateOrder } from '~features/orders/application/create_order'
import { OrderRepository } from '~features/orders/domain/order_repository'

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
