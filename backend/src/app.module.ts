import {
	Global,
	Module
} from '@nestjs/common'
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
import { AuthModule } from './auth/auth.module'
import { CartsModule } from './carts/carts.module'
import { CategoriesModule } from './categories/categories.module'
import { ItemsConfirmedModule } from './items_confirmed/items_confirmed.module'
import { NewsLettersModule } from './news_letters/news_letters.module'
import { OrdersModule } from './orders/orders.module'
import { OrdersConfirmedModule } from './orders_confirmed/orders_confirmed.module'
import { PaymentMethodsModule } from './payment_methods/payment_methods.module'
import { PaymentsModule } from './payments/payments.module'
import { ProductsModule } from './products/products.module'
import { PromotionsModule } from './promotions/promotions.module'
import { ReportsModule } from './reports/reports.module'
import { ReportsTypesModule } from './reports_types/reports_types.module'
import { RolesTypesModule } from './roles_types/roles_types.module'
import { SalesModule } from './sales/sales.module'
import { ShopsAddressModule } from './shops_address/shops_address.module'
import { UsersModule } from './users/users.module'

@Global()
@Module( {
	providers  : [
		TranslationService,
		{
			provide   : SupabaseClient<Database>,
			useFactory: async () => {
				let a                 = createClient<Database>(
					'https://uppjyrysymgslbnkxhaq.supabase.co',
					'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwcGp5cnlzeW1nc2xibmt4aGFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM2NjMyMTQsImV4cCI6MjAyOTIzOTIxNH0.7_fxI7bfFEAKjFl0mk71H4_KvNRcdjFEhbAdRGGH2Hw' )
				const { data, error } = await a.from( 'news_letter' )
				                               .select( '*' )
				console.log( 'data' )
				console.log( data )
				return a
			}
		},
	],
	imports    : [
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
		PaymentsModule, ItemsConfirmedModule, OrdersConfirmedModule,
		PaymentMethodsModule, CartsModule, ProductsModule, SalesModule,
		ReportsModule, ReportsTypesModule, RolesTypesModule, UsersModule,
		ShopsAddressModule, CategoriesModule, AuthModule ],
	exports		: [ TranslationService, SupabaseClient<Database> ]
} )
export class AppModule {}
