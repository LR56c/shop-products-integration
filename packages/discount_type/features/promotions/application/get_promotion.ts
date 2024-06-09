import { Errors } from 'packages/shared/domain/exceptions/errors'
import { BaseException } from '../../../../shared/domain/exceptions/BaseException'
import { InvalidUUIDException } from '../../../../shared/domain/exceptions/InvalidUUIDException'
import { UUID } from '../../../../shared/domain/value_objects/uuid'
import {
	wrapType,
	wrapTypeErrors
} from '../../../../shared/utils/wrap_type'
import { PromotionRepository } from '../domain/promotion_repository'
import { PromotionResponse } from '../domain/promotion_response'

export const GetPromotion = async ( repo: PromotionRepository,
	id: string ): Promise<PromotionResponse | Errors> => {

	const idResult = wrapType<UUID, InvalidUUIDException>(
		() => UUID.from( id ) )

	if ( idResult instanceof BaseException ) {
		return new Errors( [ idResult ] )
	}

	return await wrapTypeErrors( () => repo.getByID( idResult ) )
}
