import { Errors } from 'packages/shared/domain/exceptions/errors'
import { BaseException } from '../../../../shared/domain/exceptions/BaseException'
import { InvalidIntegerException } from '../../../../shared/domain/exceptions/InvalidIntegerException'
import { InvalidUUIDException } from '../../../../shared/domain/exceptions/InvalidUUIDException'
import { UUID } from '../../../../shared/domain/value_objects/uuid'
import { ValidInteger } from '../../../../shared/domain/value_objects/valid_integer'
import {
	wrapType,
	wrapTypeErrors
} from '../../../../shared/utils/wrap_type'
import { PromotionProduct } from '../domain/promotion'
import { PromotionRepository } from '../domain/promotion_repository'

export const LinkProducts = async ( repo: PromotionRepository,
	props: {
		id: string,
		products: {
			quantity: number,
			product_id: string
		}[]
	} ): Promise<PromotionProduct[] | Errors> => {

	const errors: BaseException[] = []

	const idResult = wrapType<UUID, InvalidUUIDException>(
		() => UUID.from( props.id ) )

	if ( idResult instanceof BaseException ) {
		errors.push( new InvalidUUIDException( 'id' ) )
	}

	const promotionsProducts: PromotionProduct[] = []

	for ( const p of props.products ) {

		const productResult = wrapType<UUID, InvalidUUIDException>(
			() => UUID.from( p.product_id ) )

		if ( productResult instanceof BaseException ) {
			errors.push( new InvalidUUIDException( 'product_id' ) )
		}

		const quantityResult = wrapType<ValidInteger, InvalidIntegerException>(
			() => ValidInteger.from( p.quantity ) )

		if ( quantityResult instanceof BaseException ) {
			errors.push( new InvalidIntegerException( 'quantity' ) )
		}

		promotionsProducts.push(
			new PromotionProduct( quantityResult as ValidInteger,
				productResult as UUID ) )
	}

	if ( errors.length > 0 ) {
		return new Errors( errors )
	}

	const result = await wrapTypeErrors(
		() => repo.linkProducts( idResult as UUID, promotionsProducts ) )

	if ( result instanceof Errors ) {
		return result
	}

	return promotionsProducts
}
