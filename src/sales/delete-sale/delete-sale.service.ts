import { Injectable } from '@nestjs/common'
import { DiscountRepository } from 'packages/discount_type/domain/discount_repository'
import { UUID } from 'packages/shared/domain/value_objects/uuid'

@Injectable()
export class DeleteSaleService {
	constructor(
		private readonly repo: DiscountRepository
	)
	{}

	async deleteSale( id: UUID ): Promise<boolean> {
		return this.repo.remove( id )
	}
}
