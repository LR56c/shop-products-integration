import { Category } from 'features/categories/domain/models/category'

export abstract class CategoryRepository {
	abstract save( name: string ): Promise<boolean>

	abstract delete( name: string ): Promise<boolean>

	abstract update( name: string ): Promise<boolean>

	abstract getByName( name: string ): Promise<Category>

	abstract getAll(): Promise<Category[]>
}
