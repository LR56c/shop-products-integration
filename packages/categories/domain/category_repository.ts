import { ValidInteger } from '../../shared/domain/value_objects/valid_integer'
import { ValidString } from '../../shared/domain/value_objects/valid_string'
import { Category } from './category'

export abstract class CategoryRepository {
	abstract save( category: Category ): Promise<boolean>

	abstract delete( category: ValidString ): Promise<boolean>

	abstract get( from: ValidInteger, to: ValidInteger,
		name?: ValidString ): Promise<Category[]>
}
