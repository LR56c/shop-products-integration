import {
	forwardRef,
	Module
} from '@nestjs/common'
import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from 'database.types'
import { SaleRepository } from '../../packages/discount_type/features/sales/domain/sale_repository'
import { SaleSupabaseData } from '../../packages/discount_type/features/sales/infrastructure/sale_supabase_data'
import { AppModule } from '../app.module'
import { CreateSaleController } from './create-sale/create-sale.controller'
import { CreateSaleService } from './create-sale/create-sale.service'
import { DeleteSaleController } from './delete-sale/delete-sale.controller'
import { DeleteSaleService } from './delete-sale/delete-sale.service'
import { GetAllSaleController } from './get-all-sale/get-all-sale.controller'
import { GetAllSaleService } from './get-all-sale/get-all-sale.service'
import { GetSaleController } from './get-sale/get-sale.controller'
import { GetSaleService } from './get-sale/get-sale.service'

@Module( {
	controllers: [
		GetAllSaleController,
		GetSaleController,
		CreateSaleController,
		DeleteSaleController
	],
	providers  : [
		{
			provide   : SaleRepository,
			useFactory: ( client: SupabaseClient<Database> ) => {
				return new SaleSupabaseData( client )
			},
			inject    : [ SupabaseClient<Database> ]
		},
		GetAllSaleService, GetSaleService, CreateSaleService, DeleteSaleService
	],
	imports    : [
		forwardRef( () => AppModule )

	]
} )
export class SalesModule {}
