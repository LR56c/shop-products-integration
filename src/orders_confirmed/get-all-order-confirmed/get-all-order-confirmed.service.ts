import { Injectable } from '@nestjs/common'
import { OrderConfirmed } from 'packages/order_confirmed/domain/order_confirmed'
import { OrderConfirmedRepository } from 'packages/order_confirmed/domain/order_confirmed_repository'
import { ValidInteger } from 'packages/shared/domain/value_objects/valid_integer'
import {GetAllOrderConfirmed} from "packages/order_confirmed/application/get_all_order_confirmed";

@Injectable()
export class GetAllOrderConfirmedService {
	constructor( private readonly repo: OrderConfirmedRepository ) {}

	async execute( from: number, to: number ): Promise<OrderConfirmed[]> {
		return GetAllOrderConfirmed(this.repo, { from, to })
	}
}
