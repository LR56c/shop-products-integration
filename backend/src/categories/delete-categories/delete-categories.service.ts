import { Injectable } from '@nestjs/common'
import { Category } from '~features/categories/domain/category'
import { CategoryRepository } from '~features/categories/domain/category_repository'
import {DeleteCategory} from "~features/categories/application/delete_category";

@Injectable()
export class DeleteCategoriesService {
	constructor( private readonly repo: CategoryRepository ) {}

	async deleteCategory( name: string ): Promise<boolean> {
		return DeleteCategory( this.repo, name )
	}
}
