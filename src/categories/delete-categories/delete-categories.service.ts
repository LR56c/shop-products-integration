import { Injectable } from '@nestjs/common'
import { DeleteCategory } from 'packages/categories/application/delete_category'
import { CategoryRepository } from 'packages/categories/domain/category_repository'
import { Errors } from 'packages/shared/domain/exceptions/errors'

@Injectable()
export class DeleteCategoriesService {
	constructor( private readonly repo: CategoryRepository ) {}

	async deleteCategory( category: string ): Promise<boolean> {
		const result = await DeleteCategory( this.repo, {
			name: category
		} )

		if ( result instanceof Errors ) {
			throw [ ...result.values ]
		}

		return result
	}
}
