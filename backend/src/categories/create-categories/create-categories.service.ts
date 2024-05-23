import { Injectable } from '@nestjs/common'
import { Category } from '~features/categories/domain/category'
import { CategoryRepository } from '~features/categories/domain/category_repository'
import {CreateCategory} from "~features/categories/application/create_category";

@Injectable()
export class CreateCategoriesService {
	constructor(private readonly repo: CategoryRepository) {
	}

	async createCategory(name: string): Promise<boolean> {
		return CreateCategory(this.repo, {name})
	}
}
