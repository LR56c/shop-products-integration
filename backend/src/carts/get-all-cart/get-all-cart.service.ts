import { Injectable } from '@nestjs/common';
import { Cart } from '~features/carts/domain/cart'
import { CartRepository } from '~features/carts/domain/cart_repository'
import { Email } from '~features/shared/domain/value_objects/Email'
import { ValidInteger } from '~features/shared/domain/value_objects/ValidInteger'
import {GetAllCart} from "~features/carts/application/get_all_cart";
import {CartResponse} from "~features/carts/domain/cart_response";

@Injectable()
export class GetAllCartService {
	constructor( private readonly repo: CartRepository ) {}

	public getAllCart(from : number, to: number, email?:string): Promise<CartResponse[]> {
		return GetAllCart( this.repo, { from, to, user_email: email })
	}
}
