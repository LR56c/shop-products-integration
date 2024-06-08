import { ProductRepository } from '../domain/repository/product_repository'
import {
	wrapType,
	wrapTypeAsync,
} from '../../shared/utils/wrap_type'
import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { UUID } from '../../shared/domain/value_objects/uuid'
import { InvalidUUIDException } from '../../shared/domain/exceptions/InvalidUUIDException'

export const DeleteProduct = async (
	repo: ProductRepository,
	id: string ): Promise<boolean| BaseException> => {
	const idResult = wrapType<UUID, InvalidUUIDException>(
		() => UUID.from( id ) )

	if ( idResult instanceof BaseException ) {
		throw [ new InvalidUUIDException( 'id' ) ]
	}

	return await wrapTypeAsync(() => repo.deleteProduct( idResult ))
}
