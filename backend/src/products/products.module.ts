import {
	forwardRef,
	Module
} from '@nestjs/common'
import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from 'database.types'
import { DeleteAllProductsController } from 'src/products/delete-all-products/delete-all-products.controller'
import { DeleteAllProductsService } from 'src/products/delete-all-products/delete-all-products.service'
import { DeleteProductService } from './delete-product/delete-product.service'
import { GetAllProductsService } from 'src/products/get-all-controller/get-all-products.service'
import { GetProductService } from './get-product/get-product.service'
import { RecommendProductService } from 'src/products/get-recommend-product/recommend-product.service'
import { SearchProductService } from './search-product/search-product.service'
import { UpdateProductService } from './update-product/update-product.service'
import { ProductRepository } from '~features/products/domain/repository/product_repository'
import { ProductSupabaseData } from '~features/products/infrastructure/product_supabase_data'
import { AppModule } from '../app.module'
import { DeleteProductController } from './delete-product/delete-product.controller'
import { GetAllProductsController } from 'src/products/get-all-controller/get-all-products.controller'
import { GetProductController } from './get-product/get-product.controller'
import { RecommendProductController } from 'src/products/get-recommend-product/recommend-product.controller'
import { SearchProductController } from './search-product/search-product.controller'
import { UpdateProductController } from './update-product/update-product.controller'
import { CreateProductController } from './create-product/create-product.controller'
import { CreateProductService } from './create-product/create-product.service'

@Module( {
	controllers: [ UpdateProductController, SearchProductController,
		RecommendProductController,
		GetProductController, GetAllProductsController, DeleteProductController,
		CreateProductController, DeleteAllProductsController
	],
	providers  : [
		{
			provide   : ProductRepository,
			useFactory: ( client: SupabaseClient<Database> ) => {
				return new ProductSupabaseData( client )
			},
			inject    : [ SupabaseClient<Database> ]
		},
		UpdateProductService, SearchProductService, RecommendProductService,
		GetProductService, GetAllProductsService, DeleteProductService,
		CreateProductService, DeleteAllProductsService
	],
	imports    : [
		forwardRef( () => AppModule )
	]
} )
export class ProductsModule {}
