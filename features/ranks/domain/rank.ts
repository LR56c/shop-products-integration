import { Email } from 'features/shared/domain/value_objects/Email'
import { ValidDate } from '../../shared/domain/value_objects/ValidDate'
import { ValidRank } from '../../shared/domain/value_objects/ValidRank'
import { ValidString } from '../../shared/domain/value_objects/ValidString'

export class Rank{
	constructor(
		readonly user_email: Email,
		readonly createdAt: ValidDate,
		readonly value: ValidRank,
		readonly code: ValidString,
	) { }
}
