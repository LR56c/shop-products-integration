import { Injectable } from '@nestjs/common'
import { GetOrderConfirmed } from '~features/order_confirmed/application/get_order_confirmed'
import { OrderConfirmed } from '~features/order_confirmed/domain/order_confirmed'
import { OrderConfirmedRepository } from '~features/order_confirmed/domain/order_confirmed_repository'

@Injectable()
export class GetOrderConfirmedService {
	constructor( private readonly repo: OrderConfirmedRepository ) {}

	async execute( id: string ): Promise<OrderConfirmed> {
		return GetOrderConfirmed( this.repo, id )
	}
}
