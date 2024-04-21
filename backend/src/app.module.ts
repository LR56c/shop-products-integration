import {
  Global,
  Module
} from '@nestjs/common'
import { NewsLetterRepository } from '~features/news_letter/domain/repository/NewsLetterRepository'
import { NewsLetterSupabaseData } from '~features/news_letter/infrastructure/NewsLetterSupabaseData'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PromotionsModule } from './promotions/promotions.module'
import { NewsLettersModule } from './news_letters/news_letters.module'
import { OrdersModule } from './orders/orders.module'
import { PaymentsModule } from './payments/payments.module'
import { ItemsConfirmedModule } from './items_confirmed/items_confirmed.module'
import { OrdersConfirmedModule } from './orders_confirmed/orders_confirmed.module'
import { PaymentMethodsModule } from './payment_methods/payment_methods.module'
import { CartsModule } from './carts/carts.module'
import { ProductsModule } from './products/products.module'
import { SalesModule } from './sales/sales.module'
import { ReportsModule } from './reports/reports.module'
import { ReportsTypesModule } from './reports_types/reports_types.module'
import { RolesTypesModule } from './roles_types/roles_types.module'
import { UsersModule } from './users/users.module'
import { ShopsAddressModule } from './shops_address/shops_address.module'
import { CategoriesModule } from './categories/categories.module'
import { AuthModule } from './auth/auth.module'

@Global()
@Module( {
	controllers: [ AppController ],
	providers  : [
		AppService,
		{
			provide: NewsLetterRepository,
			useClass: NewsLetterSupabaseData
		}
	],
	imports    : [ PromotionsModule, NewsLettersModule, OrdersModule,
		PaymentsModule, ItemsConfirmedModule, OrdersConfirmedModule,
		PaymentMethodsModule, CartsModule, ProductsModule, SalesModule,
		ReportsModule, ReportsTypesModule, RolesTypesModule, UsersModule,
		ShopsAddressModule, CategoriesModule, AuthModule ],
	exports		: [ NewsLetterRepository ]
} )
export class AppModule {}
