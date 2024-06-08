import { Sale } from '../domain/sale'
import { SaleRepository } from '../domain/sale_repository'
import { BaseException } from '../../../../shared/domain/exceptions/BaseException'
import { InvalidUUIDException } from '../../../../shared/domain/exceptions/InvalidUUIDException'
import { UUID } from '../../../../shared/domain/value_objects/uuid'
import { wrapType } from '../../../../shared/utils/wrap_type'

export const GetSale = async ( repo: SaleRepository,
	id: string ): Promise<Sale> => {

	const idResult = wrapType<UUID, InvalidUUIDException>(
		() => UUID.from( id ) )

	if ( idResult instanceof BaseException ) {
		throw [ new InvalidUUIDException( 'id' ) ]
	}

	return repo.getByID( idResult )
}
