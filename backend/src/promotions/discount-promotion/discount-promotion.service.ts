import { Injectable } from '@nestjs/common';
import { PromotionRepository } from '~features/discount_type/features/promotions/domain/promotion_repository'
import { Product } from '~features/products/domain/models/product'

@Injectable()
export class DiscountPromotionService {
	constructor( private readonly repo: PromotionRepository ) {}

	async execute( products: Product[] ) : Promise<boolean> {
		//TODO: cambiar return
		return this.repo.discount(products)
	}
}
