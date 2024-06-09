import {
	forwardRef,
	Module
} from '@nestjs/common'
import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from 'database.types'
import { ShopAddressRepository } from 'packages/shop-address/domain/shop-address-repository'
import { ShopAddressSupabaseData } from 'packages/shop-address/infrastructure/shop-address-supabase-data'
import { AppModule } from '../app.module'
import { CreateShopAddressController } from './create-shop-address/create-shop-address.controller'
import { CreateShopAddressService } from './create-shop-address/create-shop-address.service'
import { DeleteShopAddressController } from './delete-shop-address/delete-shop-address.controller'
import { DeleteShopAddressService } from './delete-shop-address/delete-shop-address.service'
import { GetShopAddressController } from './get-shop-address/get-shop-address.controller'
import { GetShopAddressService } from './get-shop-address/get-shop-address.service'

@Module( {
	controllers: [ CreateShopAddressController, GetShopAddressController,
		DeleteShopAddressController ],
	providers  : [ {
		provide   : ShopAddressRepository,
		useFactory: ( client: SupabaseClient<Database> ) => {
			return new ShopAddressSupabaseData( client )
		},
		inject    : [ SupabaseClient<Database> ]
	}, CreateShopAddressService, GetShopAddressService,
		DeleteShopAddressService ],
	imports    : [ forwardRef( () => AppModule ) ]
} )
export class ShopsAddressModule {}
