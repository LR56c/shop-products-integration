import { Injectable } from '@nestjs/common'
import { SaveCategory } from 'packages/categories/application/save_category'
import { CategoryRepository } from 'packages/categories/domain/category_repository'
import { Errors } from 'packages/shared/domain/exceptions/errors'

@Injectable()
export class CreateCategoriesService {
	constructor( private readonly repo: CategoryRepository ) {}

	async createCategory( category: string ): Promise<boolean> {
		const result = await SaveCategory( this.repo, {
			name: category
		} )

		if ( result instanceof Errors ) {
			throw [...result.values]
		}

		return result
	}
}
