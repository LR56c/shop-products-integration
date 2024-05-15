import { Product } from '../domain/models/product'
import { ProductRepository } from '../domain/repository/product_repository'
import { wrapType } from '../../shared/utils/WrapType'
import { InvalidUUIDException } from '../../shared/domain/exceptions/InvalidUUIDException'
import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { UUID } from '../../shared/domain/value_objects/UUID'

export const GetProduct = async (
	repo: ProductRepository,
	id : string ): Promise<Product> => {

	const idResult = wrapType<UUID, InvalidUUIDException>(
		() => UUID.from( id ) )

	if ( idResult instanceof BaseException ) {
		throw [ new InvalidUUIDException( 'id' )]
	}

	return repo.getProduct( idResult )
}
