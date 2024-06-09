import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from 'database.types'
import { SubTypeNotExistException } from '../../shared/domain/exceptions/SubTypeNotExistException'
import { UUID } from '../../shared/domain/value_objects/uuid'
import { InfrastructureException } from '../../shared/infrastructure/infrastructure_exception'
import { KeyAlreadyExistException } from '../../shared/infrastructure/key_already_exist_exception'
import { ParameterNotMatchException } from '../../shared/infrastructure/parameter_not_match_exception'
import { discountToJson } from '../application/discount_mapper'
import { Discount } from '../domain/discount'
import { DiscountRepository } from '../domain/discount_repository'
import { DiscountTypeEnum } from '../domain/discount_type'
import { Promotion } from '../features/promotions/domain/promotion'
import { Sale } from '../features/sales/domain/sale'

export class DiscountSupabaseData implements DiscountRepository {
	constructor( private readonly client: SupabaseClient<Database> ) {}

	readonly rootTableName       = 'discounts'
	readonly promotionsTableName = 'promotions'
	readonly salesTableName      = 'sales'


	async create( discount: Discount ): Promise<boolean> {
		const result = await this.client.from( this.rootTableName )
		                         .insert( discountToJson( discount ) as any )

		if ( result.error != null ) {
			if ( result.error.code === '23505' ) {
				throw [ new KeyAlreadyExistException() ]
			}

			throw [ new InfrastructureException() ]
		}

		if ( discount.type.value === DiscountTypeEnum.PROMOTION ) {
			const resultPromotion = await this.client.from( this.promotionsTableName )
			                                  .insert( {
				                                  id  : discount.id.value,
				                                  name: ( discount as Promotion ).name.value
			                                  } as any )

			if ( resultPromotion.error != null ) {
				if ( resultPromotion.error.code === '23505' ) {
					throw [ new KeyAlreadyExistException() ]
				}

				throw [ new InfrastructureException() ]
			}
		}
		else if ( discount.type.value === DiscountTypeEnum.SALE ) {
			const resultSale = await this.client.from( this.salesTableName )

			                             .insert( {
				                             id        : discount.id.value,
				                             product_id: ( discount as Sale ).product_id.value
			                             } as any )

			if ( resultSale.error != null ) {
				if ( resultSale.error.code === '23505' ) {
					throw [ new KeyAlreadyExistException() ]
				}

				throw [ new InfrastructureException() ]
			}
		}
		else {
			throw [ new SubTypeNotExistException() ]
		}

		return true
	}

	async remove( id: UUID ): Promise<boolean> {
		try {

			const result = await this.client.from( this.rootTableName )
			                         .select()
			                         .eq( 'id', id.value )

			if ( result.data?.length === 0 ) {
				throw [ new ParameterNotMatchException() ]
			}

			await this.client.from( this.rootTableName )
			          .delete()
			          .eq( 'id', id.value )

			return true
		}
		catch ( e ) {
			throw e
		}
	}
}
