import { Injectable } from '@nestjs/common';
import { Promotion } from '~features/promotions/domain/promotion'
import { PromotionRepository } from '~features/promotions/domain/promotion_repository'
import { UUID } from '~features/shared/domain/value_objects/UUID'

@Injectable()
export class GetPromotionService {
	constructor( private readonly repo: PromotionRepository ) {}

	async execute( id: UUID ): Promise<Promotion> {
		return this.repo.getByID( id )
	}
}
