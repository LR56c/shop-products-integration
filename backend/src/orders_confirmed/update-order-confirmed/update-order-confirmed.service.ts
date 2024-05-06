import { Injectable } from '@nestjs/common'
import { OrderConfirmed } from '~features/order_confirmed/domain/order_confirmed'
import { OrderConfirmedRepository } from '~features/order_confirmed/domain/order_confirmed_repository'
import { UUID } from '~features/shared/domain/value_objects/UUID'

@Injectable()
export class UpdateOrderConfirmedService {
	constructor( private readonly repo: OrderConfirmedRepository ) {}

	async execute( id: UUID, orderConfirmed: OrderConfirmed ): Promise<boolean> {
		return await this.repo.update( id, orderConfirmed )
	}
}
