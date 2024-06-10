import {
	forwardRef,
	Module
} from '@nestjs/common'
import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from 'database.types'
import { OrderRepository } from '../../packages/orders/domain/order_repository'
import { OrderSupabaseData } from '../../packages/orders/infrastructure/order_supabase_data'
import { AppModule } from '../app.module'
import { CreateOrderController } from './create-order/create-order.controller'
import { CreateOrderService } from './create-order/create-order.service'
import { DeleteOrderController } from './delete-order/delete-order.controller'
import { DeleteOrderService } from './delete-order/delete-order.service'
import { GetAllOrdersController } from './get-all-orders/get-all-orders.controller'
import { GetAllOrdersService } from './get-all-orders/get-all-orders.service'
import { GetOrderController } from './get-order/get-order.controller'
import { GetOrderService } from './get-order/get-order.service'
import { ApplyItemConfirmedService } from './shared/services/apply-item-confirmed/apply-item-confirmed.service'
import { ApplyOrderConfirmedService } from './shared/services/apply-order-confirmed/apply-order-confirmed.service'
import { UpdateOrderController } from './update-order/update-order.controller'
import { UpdateOrderService } from './update-order/update-order.service'

@Module( {
	controllers: [ CreateOrderController, DeleteOrderController,
		UpdateOrderController, GetOrderController, GetAllOrdersController ],
	providers  : [ {
		provide   : OrderRepository,
		useFactory: ( client: SupabaseClient<Database> ) => {
			return new OrderSupabaseData( client )
		},
		inject    : [ SupabaseClient<Database> ]
	}, CreateOrderService, DeleteOrderService, GetOrderService,
		GetAllOrdersService, UpdateOrderService, ApplyItemConfirmedService,
		ApplyOrderConfirmedService ],
	imports    :
		[ forwardRef( () => AppModule ) ]
} )

export class OrdersModule {}
