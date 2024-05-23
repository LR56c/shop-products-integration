import { Injectable } from '@nestjs/common'
import { OrderConfirmed } from '~features/order_confirmed/domain/order_confirmed'
import { OrderConfirmedRepository } from '~features/order_confirmed/domain/order_confirmed_repository'
import { ValidInteger } from '~features/shared/domain/value_objects/ValidInteger'
import {GetAllOrderConfirmed} from "~features/order_confirmed/application/get_all_order_confirmed";

@Injectable()
export class GetAllOrderConfirmedService {
	constructor( private readonly repo: OrderConfirmedRepository ) {}

	async execute( from: number, to: number ): Promise<OrderConfirmed[]> {
		return GetAllOrderConfirmed(this.repo, { from, to })
	}
}
