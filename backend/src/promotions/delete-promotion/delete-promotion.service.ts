import { Injectable } from '@nestjs/common';
import { DiscountRepository } from '~features/discount_type/domain/discount_repository'
import { UUID } from '~features/shared/domain/value_objects/UUID'

@Injectable()
export class DeletePromotionService {
	constructor( private readonly repo: DiscountRepository ) {}

	async execute( id: UUID ): Promise<boolean> {
		return this.repo.remove( id)
	}
}
