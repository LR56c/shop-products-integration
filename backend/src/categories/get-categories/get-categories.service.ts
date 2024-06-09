import { Injectable } from '@nestjs/common'
import { GetCategory } from '~features/categories/application/get_category'
import { CategoryRepository } from '~features/categories/domain/category_repository'
import { Errors } from '~features/shared/domain/exceptions/errors'

@Injectable()
export class GetCategoriesService {
	constructor( private readonly repo: CategoryRepository ) {}

	async getCategories( from: number, to: number,
		name?: string )
	{
		const result = await GetCategory( this.repo, {
			from: from,
			to: to,
			name: name
		} )

		if ( result instanceof Errors ) {
			throw [...result.values]
		}

		return result
	}
}
