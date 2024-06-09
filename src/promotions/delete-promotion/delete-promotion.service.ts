import { Injectable } from '@nestjs/common'
import { RemoveDiscount } from 'packages/discount_type/application/remove_discount'
import { DiscountRepository } from 'packages/discount_type/domain/discount_repository'

@Injectable()
export class DeletePromotionService {
	constructor( private readonly repo: DiscountRepository ) {}

	async execute( id: string ): Promise<boolean> {
		return RemoveDiscount( this.repo, id )
	}
}
