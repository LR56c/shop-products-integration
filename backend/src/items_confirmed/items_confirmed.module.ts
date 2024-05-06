import {
	forwardRef,
	Module
} from '@nestjs/common'
import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from 'database.types'
import { AppModule } from '../app.module'
import { CreateItemConfirmedController } from './create-item-confirmed/create-item-confirmed.controller'
import { CreateItemConfirmedService } from './create-item-confirmed/create-item-confirmed.service'
import { DeleteItemConfirmedController } from './delete-item-confirmed/delete-item-confirmed.controller'
import { DeleteItemConfirmedService } from './delete-item-confirmed/delete-item-confirmed.service'
import { GetAllItemConfirmedController } from './get-all-item-confirmed/get-all-item-confirmed.controller'
import { GetAllItemConfirmedService } from './get-all-item-confirmed/get-all-item-confirmed.service'
import { GetItemConfirmedController } from './get-item-confirmed/get-item-confirmed.controller'
import { GetItemConfirmedService } from './get-item-confirmed/get-item-confirmed.service'
import { ItemConfirmedRepository } from '~features/item_confirmed/domain/item_confirmed_repository'
import { ItemConfirmedSupabaseData } from '~features/item_confirmed/infrastructure/item_confirmed_supabase_data'

@Module( {
	controllers: [ GetItemConfirmedController, GetAllItemConfirmedController,
		DeleteItemConfirmedController, CreateItemConfirmedController ],
	providers  : [ {
		provide   : ItemConfirmedRepository,
		useFactory: ( client: SupabaseClient<Database> ) => {
			return new ItemConfirmedSupabaseData( client )
		},
		inject    : [ SupabaseClient<Database> ]
	}, GetItemConfirmedService, GetAllItemConfirmedService,
		CreateItemConfirmedService, DeleteItemConfirmedService ],
	imports    : [ forwardRef( () => AppModule ) ]

} )
export class ItemsConfirmedModule {}
