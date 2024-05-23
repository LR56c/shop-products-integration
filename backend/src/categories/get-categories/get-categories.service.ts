import { Injectable } from '@nestjs/common'
import { CategoryRepository } from '~features/categories/domain/category_repository'
import {Category} from "~features/categories/domain/category";
import {GetCategory} from "~features/categories/application/get_category";

@Injectable()
export class GetCategoriesService {
	constructor( private readonly repo: CategoryRepository ) {}

	 async getCategories(from: number, to: number, name?: string): Promise<Category[]>{
		return GetCategory(this.repo, {from, to, name})
	}
}
