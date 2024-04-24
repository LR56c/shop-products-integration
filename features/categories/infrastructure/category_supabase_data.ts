import { CategoryRepository } from 'features/categories/domain/repository/category_repository'
import { Category } from '../domain/models/category'

export class CategorySupabaseData implements CategoryRepository {
	async save( name: string ): Promise<boolean> {
		return false
	}

	async delete( name: string ): Promise<boolean> {
		return false
	}

	async update( name: string ): Promise<boolean> {
		return false
	}

	async getByName( name: string ): Promise<Category> {
		throw new Error( 'Method not implemented.' )
	}

	async getAll(): Promise<Category[]> {
		return []
	}

}
