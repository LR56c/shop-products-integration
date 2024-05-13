import { UUID } from '../../../../shared/domain/value_objects/UUID'
import { Sale } from './sale'
import { ValidDate } from '../../../../shared/domain/value_objects/ValidDate'
import { ValidInteger } from '../../../../shared/domain/value_objects/ValidInteger'

export abstract class SaleRepository {
	abstract getAll( from: ValidInteger, to: ValidInteger, from_date?: ValidDate,
		to_date?: ValidDate ): Promise<Sale[]>

	abstract getByID( id: UUID ): Promise<Sale>
}
