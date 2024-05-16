import { UUID } from '../../../shared/domain/value_objects/UUID'
import { ValidString } from '../../../shared/domain/value_objects/ValidString'

export class RecommendProduct {
	constructor(
		readonly id: UUID,
		readonly category_name: ValidString
	)
	{}
}
