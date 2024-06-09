import { Injectable } from '@nestjs/common'
import { GetAllOrderConfirmed } from 'packages/order_confirmed/application/get_all_order_confirmed'
import { OrderConfirmed } from 'packages/order_confirmed/domain/order_confirmed'
import { OrderConfirmedRepository } from 'packages/order_confirmed/domain/order_confirmed_repository'
import { Errors } from 'packages/shared/domain/exceptions/errors'

@Injectable()
export class GetAllOrderConfirmedService {
	constructor( private readonly repo: OrderConfirmedRepository ) {}

	async execute( from: number, to: number ): Promise<OrderConfirmed[]> {
		const result = await GetAllOrderConfirmed( this.repo, { from, to } )

		if ( result instanceof Errors ) {
			throw [ ...result.values ]
		}

		return result
	}
}
