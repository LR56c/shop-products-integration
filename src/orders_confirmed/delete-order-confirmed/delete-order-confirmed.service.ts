import { Injectable } from '@nestjs/common'
import { DeleteOrderConfirmed } from 'packages/order_confirmed/application/delete_order_confirmed'
import { OrderConfirmedRepository } from 'packages/order_confirmed/domain/order_confirmed_repository'
import { Errors } from 'packages/shared/domain/exceptions/errors'

@Injectable()
export class DeleteOrderConfirmedService {
	constructor( private readonly repo: OrderConfirmedRepository ) {}

	async execute( id: string ): Promise<boolean> {
		const result = await DeleteOrderConfirmed( this.repo, id )

		if ( result instanceof Errors ) {
			throw [ ...result.values ]
		}

		return result
	}
}
