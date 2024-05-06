import { Injectable } from '@nestjs/common'
import { OrderRepository } from '~features/orders/domain/order_repository'
import { Email } from '~features/shared/domain/value_objects/Email'
import { UUID } from '~features/shared/domain/value_objects/UUID'
import { ValidBool } from '~features/shared/domain/value_objects/ValidBool'
import { ValidDate } from '~features/shared/domain/value_objects/ValidDate'

@Injectable()
export class CreateOrderService {
	constructor( private readonly repo: OrderRepository ) {}

	async createOrder( id: UUID,
		seller_email: Email,
		client_email: Email,
		creation_date: ValidDate,
		approved: ValidBool,
		payment_id: UUID ): Promise<boolean> {
		return this.repo.createOrder(
			id,
			seller_email,
			client_email,
			creation_date,
			approved,
			payment_id
		)
	}

}
