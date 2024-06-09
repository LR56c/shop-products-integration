import {
	forwardRef,
	Module
} from '@nestjs/common'
import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from 'database.types'
import { ProductRepository } from 'packages/products/domain/repository/product_repository'
import { ProductSupabaseData } from 'packages/products/infrastructure/product_supabase_data'
import { GetAllProductsController } from 'src/products/get-all-controller/get-all-products.controller'
import { GetAllProductsService } from 'src/products/get-all-controller/get-all-products.service'
import { RecommendProductController } from 'src/products/get-recommend-product/recommend-product.controller'
import { RecommendProductService } from 'src/products/get-recommend-product/recommend-product.service'
import { AppModule } from '../app.module'
import { CreateProductController } from './create-product/create-product.controller'
import { CreateProductService } from './create-product/create-product.service'
import { DeleteProductController } from './delete-product/delete-product.controller'
import { DeleteProductService } from './delete-product/delete-product.service'
import { GetProductController } from './get-product/get-product.controller'
import { GetProductService } from './get-product/get-product.service'
import { ApplyDiscountProductService } from './shared/services/apply-discount-product/apply-discount-product.service'
import { ApplyAverageRankToProductService } from './shared/services/calculate-average-rank-product/apply-average-rank-to-product.service'
import { UpdateProductController } from './update-product/update-product.controller'
import { UpdateProductService } from './update-product/update-product.service'

@Module( {
	controllers: [ UpdateProductController,
		RecommendProductController,
		GetProductController, GetAllProductsController, DeleteProductController,
		CreateProductController
	],
	providers  : [
		{
			provide   : ProductRepository,
			useFactory: ( client: SupabaseClient<Database> ) => {
				return new ProductSupabaseData( client )
			},
			inject    : [ SupabaseClient<Database> ]
		},
		ApplyAverageRankToProductService, ApplyDiscountProductService,
		UpdateProductService, RecommendProductService,
		GetProductService, GetAllProductsService, DeleteProductService,
		CreateProductService
	],
	imports    : [
		forwardRef( () => AppModule )
	]
} )
export class ProductsModule {}
