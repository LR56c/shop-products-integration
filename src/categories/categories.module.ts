import {
	forwardRef,
	Module
} from '@nestjs/common'
import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from 'database.types'
import { CategoryRepository } from 'packages/categories/domain/category_repository'
import { CategorySupabaseData } from 'packages/categories/infrastructure/category_supabase_data'
import { AppModule } from '../app.module'
import { CreateCategoriesController } from './create-categories/create-categories.controller'
import { CreateCategoriesService } from './create-categories/create-categories.service'
import { DeleteCategoriesController } from './delete-categories/delete-categories.controller'
import { DeleteCategoriesService } from './delete-categories/delete-categories.service'
import { GetCategoriesController } from './get-categories/get-categories.controller'
import { GetCategoriesService } from './get-categories/get-categories.service'

@Module( {
	controllers: [ CreateCategoriesController, DeleteCategoriesController,
		GetCategoriesController ],
	providers  : [ {
		provide   : CategoryRepository,
		useFactory: ( client: SupabaseClient<Database> ) => {
			return new CategorySupabaseData( client )
		},
		inject    : [ SupabaseClient<Database> ]
	}, DeleteCategoriesService, GetCategoriesService,
		CreateCategoriesService ],
	imports    : [ forwardRef( () => AppModule ) ]
} )
export class CategoriesModule {}
