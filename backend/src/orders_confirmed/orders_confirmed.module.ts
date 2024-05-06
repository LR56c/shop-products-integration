import {
	forwardRef,
	Module
} from '@nestjs/common'
import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from 'database.types'
import { AppModule } from '../app.module'
import { CreateOrderConfirmedController } from './create-order-confirmed/create-order-confirmed.controller'
import { CreateOrderConfirmedService } from './create-order-confirmed/create-order-confirmed.service'
import { DeleteOrderConfirmedController } from './delete-order-confirmed/delete-order-confirmed.controller'
import { DeleteOrderConfirmedService } from './delete-order-confirmed/delete-order-confirmed.service'
import { GetAllOrderConfirmedController } from './get-all-order-confirmed/get-all-order-confirmed.controller'
import { GetAllOrderConfirmedService } from './get-all-order-confirmed/get-all-order-confirmed.service'
import { GetOrderConfirmedController } from './get-order-confirmed/get-order-confirmed.controller'
import { GetOrderConfirmedService } from './get-order-confirmed/get-order-confirmed.service'
import { UpdateOrderConfirmedController } from './update-order-confirmed/update-order-confirmed.controller'
import { UpdateOrderConfirmedService } from './update-order-confirmed/update-order-confirmed.service'
import { OrderConfirmedRepository } from '~features/order_confirmed/domain/order_confirmed_repository'
import { OrderConfirmedSupabaseData } from '~features/order_confirmed/infrastructure/order_confirmed_supabase_data'

@Module( {
	controllers: [ CreateOrderConfirmedController, DeleteOrderConfirmedController,
		GetAllOrderConfirmedController, GetOrderConfirmedController,
		UpdateOrderConfirmedController ],
	providers  : [
		{
			provide   : OrderConfirmedRepository,
			useFactory: ( client: SupabaseClient<Database> ) => {
				return new OrderConfirmedSupabaseData( client )
			},
			inject    : [ SupabaseClient<Database> ]
		},
		CreateOrderConfirmedService, DeleteOrderConfirmedService,
		GetAllOrderConfirmedService, GetOrderConfirmedService, UpdateOrderConfirmedService
	],
	imports    : [ forwardRef( () => AppModule ) ]
} )
export class OrdersConfirmedModule {}
