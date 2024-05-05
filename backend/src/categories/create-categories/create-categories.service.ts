import { Injectable } from '@nestjs/common';
import { Category } from '~features/categories/domain/category'
import { CategoryRepository } from '~features/categories/domain/category_repository'

@Injectable()
export class CreateCategoriesService {
	constructor(private readonly repo : CategoryRepository) {}

	async createCategory( category : Category ): Promise<boolean> {
		return  this.repo.save( category )
	}
}
