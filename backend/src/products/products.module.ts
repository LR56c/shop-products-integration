import {
	forwardRef,
	Module
} from '@nestjs/common'
import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from 'database.types'
import { DeleteProductService } from './delete-product/delete-product.service'
import { GetAllService } from './get-all-controller/get-all.service'
import { GetProductService } from './get-product/get-product.service'
import { GetRecommendProductService } from './get-recommend-product/get-recommend-product.service'
import { SearchProductService } from './search-product/search-product.service'
import { UpdateProductService } from './update-product/update-product.service'
import { ProductRepository } from '~features/products/domain/repository/product_repository'
import { ProductSupabaseData } from '~features/products/infrastructure/product_supabase_data'
import { AppModule } from '../app.module'
import { DeleteProductController } from './delete-product/delete-product.controller'
import { GetAllController } from './get-all-controller/get-all.controller'
import { GetProductController } from './get-product/get-product.controller'
import { GetRecommendProductController } from './get-recommend-product/get-recommend-product.controller'
import { SearchProductController } from './search-product/search-product.controller'
import { UpdateProductController } from './update-product/update-product.controller'
import { CreateProductController } from './create-product/create-product.controller'
import { CreateProductService } from './create-product/create-product.service'

@Module( {
	controllers: [ UpdateProductController, SearchProductController,
		GetRecommendProductController,
		GetProductController, GetAllController, DeleteProductController, CreateProductController
	],
	providers  : [
		{
			provide   : ProductRepository,
			useFactory: ( client: SupabaseClient<Database> ) => {
				return new ProductSupabaseData( client )
			},
			inject    : [ SupabaseClient<Database> ]
		},
		UpdateProductService, SearchProductService, GetRecommendProductService,
		GetProductService, GetAllService, DeleteProductService, CreateProductService 
	],
	imports    : [
		forwardRef( () => AppModule ), 
	]
} )
export class ProductsModule {}
