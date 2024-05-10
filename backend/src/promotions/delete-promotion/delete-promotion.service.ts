import { Injectable } from '@nestjs/common';
import { PromotionRepository } from '~features/promotions/domain/promotion_repository'
import { UUID } from '~features/shared/domain/value_objects/UUID'

@Injectable()
export class DeletePromotionService {
	constructor( private readonly repo: PromotionRepository ) {}

	async execute( id: UUID ): Promise<boolean> {
		return this.repo.remove( id)
	}
}
