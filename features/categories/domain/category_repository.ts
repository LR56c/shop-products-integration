import { Category } from 'features/categories/domain/category'
import { ValidInteger } from 'features/shared/domain/value_objects/ValidInteger'
import { ValidString } from 'features/shared/domain/value_objects/ValidString'

export abstract class CategoryRepository {
	abstract save( category: Category ): Promise<boolean>

	abstract delete( category: Category ): Promise<boolean>

	abstract get( from: ValidInteger, to: ValidInteger,
		name?: ValidString ): Promise<Category[]>
}
