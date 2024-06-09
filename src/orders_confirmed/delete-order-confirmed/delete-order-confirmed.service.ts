import { Injectable } from '@nestjs/common'
import { DeleteOrderConfirmed } from 'packages/order_confirmed/application/delete_order_confirmed'
import { OrderConfirmedRepository } from 'packages/order_confirmed/domain/order_confirmed_repository'

@Injectable()
export class DeleteOrderConfirmedService {
	constructor( private readonly repo: OrderConfirmedRepository ) {}

	async execute( id: string ): Promise<boolean> {
		return DeleteOrderConfirmed( this.repo, id )
	}
}