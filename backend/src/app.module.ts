import {
	Global,
	Module
} from '@nestjs/common'
import { EventEmitterModule } from '@nestjs/event-emitter'
import {
	createClient,
	SupabaseClient
} from '@supabase/supabase-js'
import { Database } from 'database.types'
import {
	AcceptLanguageResolver,
	HeaderResolver,
	I18nModule,
	QueryResolver
} from 'nestjs-i18n'
import { join } from 'node:path'
import { TranslationService } from 'src/shared/services/translation/translation.service'
import { AuthRepository } from '~features/auth/domain/auth_repository'
import { AuthSupabaseData } from '~features/auth/infrastructure/auth_supabase_data'
import { DiscountRepository } from '~features/discount_type/domain/discount_repository'
import { DiscountSupabaseData } from '~features/discount_type/infrastructure/discount_supabase_data'
import { UserDao } from '~features/user/domain/dao/UserDao'
import { UserSupaBaseData } from '~features/user/infrastructure/user_supabase_data'
import { AuthModule } from './auth/auth.module'
import { CartsModule } from './carts/carts.module'
import { CategoriesModule } from './categories/categories.module'
import { ItemsConfirmedModule } from './items_confirmed/items_confirmed.module'
import { NewsLettersModule } from './news_letters/news_letters.module'
import { OrdersModule } from './orders/orders.module'
import { OrdersConfirmedModule } from './orders_confirmed/orders_confirmed.module'
import { PaymentsModule } from './payments/payments.module'
import { ProductsModule } from './products/products.module'
import { PromotionsModule } from './promotions/promotions.module'
import { RanksModule } from './ranks/ranks.module'
import { ReportsModule } from './reports/reports.module'
import { SalesModule } from './sales/sales.module'
import { ShopsAddressModule } from './shops_address/shops_address.module'
import { UsersModule } from './users/users.module'

@Global()
@Module( {
	providers: [
		TranslationService,
		{
			provide   : SupabaseClient<Database>,
			useFactory: async () => {
				let client = createClient<Database>(
					// 'https://uppjyrysymgslbnkxhaq.supabase.co',
					'https://wqzqxgeilepfytyppfym.supabase.co',
					// 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwcGp5cnlzeW1nc2xibmt4aGFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM2NjMyMTQsImV4cCI6MjAyOTIzOTIxNH0.7_fxI7bfFEAKjFl0mk71H4_KvNRcdjFEhbAdRGGH2Hw' )
					'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxenF4Z2VpbGVwZnl0eXBwZnltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU2MjMyNTQsImV4cCI6MjAzMTE5OTI1NH0.L7bKFkZ5eGffPLbBOKnRujbQTD6vq2FYr114NuNu9Zs' )

				await client.auth.signInAnonymously()
				// const r = await client.from('carts').select('*, product:product_id(*)').eq('user_email', 'aaaa@gmail.com')
				return client
			}
		},
		{
			provide   : AuthRepository,
			useFactory: ( client: SupabaseClient<Database> ) => {
				return new AuthSupabaseData( client )
			},
			inject    : [ SupabaseClient<Database> ]
		},
		{
			provide   : DiscountRepository,
			useFactory: ( client: SupabaseClient<Database> ) => {
				return new DiscountSupabaseData( client )
			},
			inject    : [ SupabaseClient<Database> ]
		},
		{
			provide   : UserDao,
			useFactory: ( client: SupabaseClient<Database> ) => {
				return new UserSupaBaseData( client )
			},
			inject    : [ SupabaseClient<Database> ]
		}
	],
	imports  : [
		EventEmitterModule.forRoot(),
		I18nModule.forRootAsync( {
			useFactory: () => ( {
				fallbackLanguage: 'en',
				loaderOptions   : {
					path : join( __dirname, '/i18n/' ),
					watch: true
				}
			} ),
			resolvers : [
				{ use: QueryResolver, options: [ 'lang' ] },
				AcceptLanguageResolver,
				new HeaderResolver( [ 'x-lang' ] )
			],
			inject    : []
		} ),
		PromotionsModule, NewsLettersModule, OrdersModule,
		PaymentsModule, ItemsConfirmedModule, OrdersConfirmedModule, CartsModule,
		ProductsModule,
		ReportsModule, UsersModule,
		ShopsAddressModule, CategoriesModule, AuthModule, RanksModule, SalesModule ],
	exports  : [ TranslationService, SupabaseClient<Database>, AuthRepository,
		UserDao, DiscountRepository ]
} )
export class AppModule {}
