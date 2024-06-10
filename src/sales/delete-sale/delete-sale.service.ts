import { Injectable } from '@nestjs/common'
import { RemoveDiscount } from '../../../packages/discount_type/application/remove_discount'
import { DiscountRepository } from '../../../packages/discount_type/domain/discount_repository'
import { Errors } from '../../../packages/shared/domain/exceptions/errors'

@Injectable()
export class DeleteSaleService {
	constructor(
		private readonly repo: DiscountRepository
	)
	{}

	async deleteSale( id: string ): Promise<boolean> {
		const result = await RemoveDiscount( this.repo, id )

		if ( result instanceof Errors ) {
			throw [ ...result.values ]
		}

		return result
	}
}
