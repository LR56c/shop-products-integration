import { Injectable } from '@nestjs/common'
import { DeleteCategory } from '~features/categories/application/delete_category'
import { CategoryRepository } from '~features/categories/domain/category_repository'
import { Errors } from '~features/shared/domain/exceptions/errors'

@Injectable()
export class DeleteCategoriesService {
	constructor( private readonly repo: CategoryRepository ) {}

	async deleteCategory( category: string ): Promise<boolean> {
		const result = await DeleteCategory( this.repo, {
			name: category
		} )

		if ( result instanceof Errors ) {
			throw [...result.values]
		}

		return result
	}
}
