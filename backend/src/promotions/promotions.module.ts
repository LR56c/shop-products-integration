import {
	forwardRef,
	Module
} from '@nestjs/common'
import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from 'database.types'
import { PromotionRepository } from '~features/promotions/domain/promotion_repository'
import { PromotionSupabaseData } from '~features/promotions/infrastructure/promotion_supabase_data'
import { AppModule } from '../app.module'
import { CreatePromotionController } from './create-promotion/create-promotion.controller'
import { CreatePromotionService } from './create-promotion/create-promotion.service'
import { DeletePromotionController } from './delete-promotion/delete-promotion.controller'
import { DeletePromotionService } from './delete-promotion/delete-promotion.service'
import { DiscountPromotionController } from './discount-promotion/discount-promotion.controller'
import { DiscountPromotionService } from './discount-promotion/discount-promotion.service'
import { GetAllPromotionController } from './get-all-promotion/get-all-promotion.controller'
import { GetAllPromotionService } from './get-all-promotion/get-all-promotion.service'
import { GetPromotionController } from './get-promotion/get-promotion.controller'
import { GetPromotionService } from './get-promotion/get-promotion.service'
import { UpdatePromotionController } from './update-promotion/update-promotion.controller'
import { UpdatePromotionService } from './update-promotion/update-promotion.service'

@Module( {
	controllers: [ CreatePromotionController, DeletePromotionController,
		DiscountPromotionController, GetAllPromotionController,
		GetPromotionController, UpdatePromotionController ],
	providers  : [
		{
			provide   : PromotionRepository,
			useFactory: ( client: SupabaseClient<Database> ) => {
				return new PromotionSupabaseData( client )
			},
			inject    : [ SupabaseClient<Database> ]
		},
		CreatePromotionService, DeletePromotionService, DiscountPromotionService,
		GetAllPromotionService, GetPromotionService, UpdatePromotionService
	],
	imports    : [
		forwardRef( () => AppModule )
	]
} )
export class PromotionsModule {}
