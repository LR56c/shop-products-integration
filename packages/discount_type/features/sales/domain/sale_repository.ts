import { UUID } from '../../../../shared/domain/value_objects/uuid'
import { ValidDate } from '../../../../shared/domain/value_objects/valid_date'
import { ValidInteger } from '../../../../shared/domain/value_objects/valid_integer'
import { Sale } from './sale'

export abstract class SaleRepository {
	abstract getAll( from: ValidInteger, to: ValidInteger, from_date?: ValidDate,
		to_date?: ValidDate ): Promise<Sale[]>

	abstract getByID( id: UUID ): Promise<Sale>
}
