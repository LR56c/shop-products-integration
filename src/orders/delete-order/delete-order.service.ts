import { Injectable } from '@nestjs/common'
import { DeleteOrder } from '../../../packages/orders/application/delete_order'
import { OrderRepository } from '../../../packages/orders/domain/order_repository'
import { Errors } from '../../../packages/shared/domain/exceptions/errors'

@Injectable()
export class DeleteOrderService {
	constructor( private readonly repo: OrderRepository ) {}

	async deleteOrder( id: string ): Promise<boolean> {
		const result = await DeleteOrder( this.repo, id )
		if( result instanceof Errors ) {
			throw [...result.values]
		}

		return result
	}
}
