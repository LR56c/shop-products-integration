import {
	forwardRef,
	Module
} from '@nestjs/common'
import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from 'database.types'
import { GetAllCartController } from './get-all-cart/get-all-cart.controller'
import { GetAllCartService } from './get-all-cart/get-all-cart.service'
import { GetCartByUserEmailController } from './get-cart-by-user-email/get-cart-by-user-email.controller'
import { GetCartByUserEmailService } from './get-cart-by-user-email/get-cart-by-user-email.service'
import { CartRepository } from '~features/carts/domain/cart_repository'
import { CartSupabaseData } from '~features/carts/infrastructure/cart_supabase_data'
import { AppModule } from '../app.module'
import { AddCartController } from './add-cart/add-cart.controller'
import { AddCartService } from './add-cart/add-cart.service'
import { DeleteAllCartController } from './delete-all-cart/delete-all-cart.controller'
import { DeleteAllCartService } from './delete-all-cart/delete-all-cart.service'
import { DeleteCartController } from './delete-cart/delete-cart.controller'
import { DeleteCartService } from './delete-cart/delete-cart.service'
import { UpdateCartController } from './update-cart/update-cart.controller'
import { UpdateCartService } from './update-cart/update-cart.service'

@Module( {
	controllers: [ AddCartController, DeleteAllCartController,
		GetAllCartController, GetCartByUserEmailController,
		DeleteCartController, UpdateCartController ],
	providers  : [
		{
			provide   : CartRepository,
			useFactory: ( client: SupabaseClient<Database> ) => {
				return new CartSupabaseData( client )
			},
			inject    : [ SupabaseClient<Database> ]
		},
		AddCartService, DeleteAllCartService, DeleteCartService, GetAllCartService,
		GetCartByUserEmailService,
		UpdateCartService ],
	imports    : [ forwardRef( () => AppModule )
	]
} )
export class CartsModule {}
