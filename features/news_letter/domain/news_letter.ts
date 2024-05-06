import { Email } from '../../shared/domain/value_objects/Email'
import { ValidDate } from '../../shared/domain/value_objects/ValidDate'
import { ValidString } from '../../shared/domain/value_objects/ValidString'

export class NewsLetter {
	constructor(
		readonly userEmail: Email,
		readonly name: ValidString,
		readonly createdAt: ValidDate
	)
	{}
}
