import { Injectable } from '@nestjs/common'
import { PartialOrderDto } from 'src/orders/shared/dto/partial_order_dto'
import { UpdateOrder } from '~features/orders/application/update_order'
import { OrderRepository } from '~features/orders/domain/order_repository'
import { BaseException } from '~features/shared/domain/exceptions/BaseException'
import { InvalidUUIDException } from '~features/shared/domain/exceptions/InvalidUUIDException'
import { UUID } from '~features/shared/domain/value_objects/uuid'
import { wrapType } from '~features/shared/utils/wrap_type'

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

		return UpdateOrder( this.repo, idResult as UUID, orderSaved, {
			client_email      : order.client_email,
			payment_id        : order.payment_id,
			products          : order.products,
			seller_email      : order.seller_email,
			order_confirmed_id: order.order_confirmed_id,
			item_confirmed_id : order.item_confirmed_id
		} )
	}
}
