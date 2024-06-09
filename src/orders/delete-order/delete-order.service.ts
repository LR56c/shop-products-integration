import { Injectable } from '@nestjs/common'
import { DeleteOrder } from 'packages/orders/application/delete_order'
import { OrderRepository } from 'packages/orders/domain/order_repository'

@Injectable()
export class DeleteOrderService {
	constructor( private readonly repo: OrderRepository ) {}

	async deleteOrder( id: string ): Promise<boolean> {
		return DeleteOrder( this.repo, id )
	}
}
