import { UUID } from '../../../shared/domain/value_objects/uuid'
import { ValidString } from '../../../shared/domain/value_objects/valid_string'

export class RecommendProduct {
	constructor(
		readonly id: UUID,
		readonly category_name: ValidString
	)
	{}
}
