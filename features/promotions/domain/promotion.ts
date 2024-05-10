import { ValidPercentage } from 'features/sales/domain/ValidPercentage'
import { UUID } from 'features/shared/domain/value_objects/UUID'
import { ValidDate } from 'features/shared/domain/value_objects/ValidDate'
import { ValidString } from 'features/shared/domain/value_objects/ValidString'

export class Promotion{
	constructor(
		readonly id : UUID,
		readonly name : ValidString,
		readonly percentage : ValidPercentage,
		readonly creation_date : ValidDate,
		readonly end_date : ValidDate,
		readonly start_date : ValidDate,
	) {}
}
