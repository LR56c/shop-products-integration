import { Email } from '../../shared/domain/value_objects/email'
import { ValidDate } from '../../shared/domain/value_objects/valid_date'
import { ValidString } from '../../shared/domain/value_objects/valid_string'

export class NewsLetter {
	constructor(
		readonly userEmail: Email,
		readonly name: ValidString,
		readonly createdAt: ValidDate
	)
	{}
}
