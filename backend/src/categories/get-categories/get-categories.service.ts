import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '~features/categories/domain/category_repository'
import { ValidInteger } from '~features/shared/domain/value_objects/ValidInteger'
import { ValidString } from '~features/shared/domain/value_objects/ValidString'

@Injectable()
export class GetCategoriesService {
	constructor(private readonly repo : CategoryRepository) {}

	async getCategories( from : ValidInteger, to : ValidInteger, name?: ValidString ) {
		return this.repo.get( from, to, name )
	}
}
