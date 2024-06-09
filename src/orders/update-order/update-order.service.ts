import { Injectable } from '@nestjs/common'
import { UpdateOrder } from 'packages/orders/application/update_order'
import { OrderRepository } from 'packages/orders/domain/order_repository'
import { BaseException } from 'packages/shared/domain/exceptions/BaseException'
import { Errors } from 'packages/shared/domain/exceptions/errors'
import { InvalidUUIDException } from 'packages/shared/domain/exceptions/InvalidUUIDException'
import { UUID } from 'packages/shared/domain/value_objects/uuid'
import { wrapType } from 'packages/shared/utils/wrap_type'
import { PartialOrderDto } from 'src/orders/shared/dto/partial_order_dto'

@Injectable()
export class UpdateOrderService {
	constructor( private readonly repo: OrderRepository ) {}

	async updateOrder( id: string, order: PartialOrderDto ): Promise<boolean> {

		const idResult = wrapType<UUID, InvalidUUIDException>(
			() => UUID.from( id ) )

		if ( idResult instanceof BaseException ) {
			throw [ new InvalidUUIDException( 'id' ) ]
		}

		const orderSaved = await this.repo.getOrder( idResult as UUID )

		const result = await UpdateOrder( this.repo, idResult as UUID, orderSaved, {
			client_email      : order.client_email,
			payment_id        : order.payment_id,
			products          : order.products,
			seller_email      : order.seller_email,
			order_confirmed_id: order.order_confirmed_id,
			item_confirmed_id : order.item_confirmed_id
		} )

		if( result instanceof Errors ) {
			throw [...result.values]
		}

		return result
	}
}
