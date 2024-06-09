import { Email } from '../../shared/domain/value_objects/email'
import { ValidDate } from '../../shared/domain/value_objects/valid_date'
import { ValidRank } from '../../shared/domain/value_objects/valid_rank'
import { ValidString } from '../../shared/domain/value_objects/valid_string'

export class Rank {
	constructor(
		readonly user_email: Email,
		readonly createdAt: ValidDate,
		readonly value: ValidRank,
		readonly code: ValidString
	)
	{ }
}
