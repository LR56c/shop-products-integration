import { ProductRepository } from 'features/products/domain/repository/product_repository'
import { wrapType } from 'features/shared/utils/WrapType'
import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { UUID } from '../../shared/domain/value_objects/UUID'
import { InvalidUUIDException } from '../../shared/domain/exceptions/InvalidUUIDException'

export const DeleteProduct = async (
	repo: ProductRepository,
	id: string ): Promise<boolean> => {
	const idResult = wrapType<UUID, InvalidUUIDException>(
		() => UUID.from( id ) )

	if ( idResult instanceof BaseException ) {
		throw [ new InvalidUUIDException( 'id' )]
	}

	return repo.deleteProduct( idResult )
}
