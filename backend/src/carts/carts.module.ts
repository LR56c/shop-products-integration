import {
	forwardRef,
	Module
} from '@nestjs/common'
import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from 'database.types'
import { UpsertCartController } from './upsert-cart/upsert-cart.controller'
import { UpsertCartService } from './upsert-cart/upsert-cart.service'
import { GetCartByUserEmailController } from './get-cart-by-user-email/get-cart-by-user-email.controller'
import { GetCartByUserEmailService } from './get-cart-by-user-email/get-cart-by-user-email.service'
import { CartRepository } from '~features/carts/domain/cart_repository'
import { CartSupabaseData } from '~features/carts/infrastructure/cart_supabase_data'
import { AppModule } from '../app.module'
import { DeleteAllCartController } from './delete-all-cart/delete-all-cart.controller'
import { DeleteAllCartService } from './delete-all-cart/delete-all-cart.service'
import { DeleteCartController } from './delete-cart/delete-cart.controller'
import { DeleteCartService } from './delete-cart/delete-cart.service'

@Module( {
	controllers: [ DeleteAllCartController,
		GetCartByUserEmailController, UpsertCartController,
		DeleteCartController ],
	providers  : [
		{
			provide   : CartRepository,
			useFactory: ( client: SupabaseClient<Database> ) => {
				return new CartSupabaseData( client )
			},
			inject    : [ SupabaseClient<Database> ]
		},
		DeleteAllCartService, DeleteCartService,
		GetCartByUserEmailService, UpsertCartService ],
	imports    : [ forwardRef( () => AppModule )
	]
} )
export class CartsModule {}
