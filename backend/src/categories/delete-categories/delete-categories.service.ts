import { Injectable } from '@nestjs/common'
import { Category } from '~features/categories/domain/category'
import { CategoryRepository } from '~features/categories/domain/category_repository'

@Injectable()
export class DeleteCategoriesService {
	constructor( private readonly repo: CategoryRepository ) {}

	async deleteCategory( category: Category ): Promise<boolean> {
		return this.repo.delete( category )
	}
}
