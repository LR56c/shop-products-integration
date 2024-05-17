import { Injectable } from '@nestjs/common'
import { DeleteOrder } from '~features/orders/application/delete_order'
import { OrderRepository } from '~features/orders/domain/order_repository'

@Injectable()
export class DeleteOrderService {
	constructor( private readonly repo: OrderRepository ) {}

	async deleteOrder( id: string ): Promise<boolean> {
		return DeleteOrder( this.repo, id )
	}
}
