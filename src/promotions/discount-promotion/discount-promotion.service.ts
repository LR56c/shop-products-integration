import { Injectable } from '@nestjs/common'
import { GetDiscountPromotions } from 'packages/discount_type/features/promotions/application/discount_promotion'
import { PromotionProduct } from 'packages/discount_type/features/promotions/domain/promotion'
import { PromotionRepository } from 'packages/discount_type/features/promotions/domain/promotion_repository'
import { PromotionResponse } from 'packages/discount_type/features/promotions/domain/promotion_response'
import { BaseException } from 'packages/shared/domain/exceptions/BaseException'
import { InvalidIntegerException } from 'packages/shared/domain/exceptions/InvalidIntegerException'
import { InvalidUUIDException } from 'packages/shared/domain/exceptions/InvalidUUIDException'
import { UUID } from 'packages/shared/domain/value_objects/uuid'
import { ValidInteger } from 'packages/shared/domain/value_objects/valid_integer'
import { wrapType } from 'packages/shared/utils/wrap_type'
import { DiscounDto } from '../shared/promotion_dto'

@Injectable()
export class DiscountPromotionService {
	constructor(
		private readonly repo: PromotionRepository
	)
	{}

	async execute( dto: DiscounDto ): Promise<PromotionResponse[]> {

		const errors: BaseException[] = []

		const products_map: Map<string, PromotionProduct> = new Map()

		for ( const p of dto.products ) {
			const idResult = wrapType<UUID, InvalidUUIDException>(
				() => UUID.from( p.product_id ) )

			if ( idResult instanceof BaseException ) {
				errors.push( new InvalidUUIDException() )
			}

			const q = wrapType<ValidInteger, InvalidIntegerException>(
				() => ValidInteger.from( p.quantity ) )

			if ( q instanceof BaseException ) {
				errors.push( new InvalidIntegerException() )
			}

			if ( errors.length > 0 ) {
				throw errors
			}

			const qq = q as ValidInteger
			const id = idResult as UUID
			products_map.set( id.value, new PromotionProduct(
				qq,
				id
			) )
		}
		return GetDiscountPromotions( this.repo, products_map, {
			from: 0,
			to  : 1000
		} )
	}
}
