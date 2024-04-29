import { UUID } from '../../shared/domain/value_objects/UUID'
import { ValidDate } from '../../shared/domain/value_objects/ValidDate'
import { ValidRank } from '../../shared/domain/value_objects/ValidRank'
import { ValidString } from '../../shared/domain/value_objects/ValidString'

export class Rank{
	constructor(
		readonly id: UUID,
		readonly createdAt: ValidDate,
		readonly value: ValidRank,
		readonly code: ValidString,
	) { }
}
