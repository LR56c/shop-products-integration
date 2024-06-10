import { Errors } from '../../shared/domain/exceptions/errors'
import { ProductResponse } from '../domain/models/product_response'
import { ProductRepository } from '../domain/repository/product_repository'
import {
	wrapType,
	wrapTypeErrors
} from '../../shared/utils/wrap_type'
import { InvalidUUIDException } from '../../shared/domain/exceptions/InvalidUUIDException'
import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { UUID } from '../../shared/domain/value_objects/uuid'

export const GetProduct = async (
	repo: ProductRepository,
	id: string ): Promise<ProductResponse | Errors> => {

	const idResult = wrapType<UUID, InvalidUUIDException>(
		() => UUID.from( id ) )

	if ( idResult instanceof BaseException ) {
		throw [ new InvalidUUIDException( 'id' ) ]
	}

	return await wrapTypeErrors( () => repo.getProduct( idResult ) )
}
