import { Injectable } from '@nestjs/common';
import { Product } from '~features/products/domain/models/product'
import { PromotionRepository } from '~features/promotions/domain/promotion_repository'

@Injectable()
export class DiscountPromotionService {
	constructor( private readonly repo: PromotionRepository ) {}

	async execute( products: Product[] ) : Promise<boolean> {
		//TODO: cambiar return
		return this.repo.discount(products)
	}
}
