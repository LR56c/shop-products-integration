import { Injectable } from '@nestjs/common'
import { CategoryRepository } from '~features/categories/domain/category_repository'
import { ValidInteger } from '~features/shared/domain/value_objects/valid_integer'
import { ValidString } from '~features/shared/domain/value_objects/valid_string'

@Injectable()
export class GetCategoriesService {
	constructor( private readonly repo: CategoryRepository ) {}

	async getCategories( from: ValidInteger, to: ValidInteger,
		name?: ValidString )
	{
		return this.repo.get( from, to, name )
	}
}
