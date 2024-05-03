import {
	Controller,
	Get,
	HttpStatus,
	Query
} from '@nestjs/common'
import {
	ApiQuery,
	ApiTags
} from '@nestjs/swagger'
import { GetAllProductsService } from 'src/products/get-all-controller/get-all-products.service'
import { TranslationService } from 'src/shared/services/translation/translation.service'
import { HttpResultData } from 'src/shared/utils/HttpResultData'
import { productToJson } from '~features/products/application/product_mapper'
import { BaseException } from '~features/shared/domain/exceptions/BaseException'
import { InvalidIntegerException } from '~features/shared/domain/exceptions/InvalidIntegerException'
import { InvalidRoleException } from '~features/shared/domain/exceptions/InvalidRoleException'
import { InvalidStringException } from '~features/shared/domain/exceptions/InvalidStringException'
import { Role } from '~features/shared/domain/value_objects/Role'
import { ValidInteger } from '~features/shared/domain/value_objects/ValidInteger'
import { ValidString } from '~features/shared/domain/value_objects/ValidString'
import { wrapType } from '~features/shared/utils/WrapType'

@ApiTags( 'products' )
@Controller( 'products' )
export class GetAllProductsController {
	constructor(
		private readonly getAllControllerService: GetAllProductsService,
		private readonly translation: TranslationService
	)
	{}

	@Get()
	@ApiQuery({
		name: 'name',
		type: String,
		required: false,
	})
	async getAll(
		@Query( 'from' ) from: number,
		@Query( 'to' ) to: number,
		@Query( 'name' ) name?: string,
	): Promise<HttpResultData<Record<string, any>[]>> {
		try {

			const { data } = this.parseGetAllProduct( { from, to , name} )

			const products = await this.getAllControllerService.getAll( data.from,
				data.to )

			let json: Record<string, any>[] = []
			for ( const product of products ) {
				json.push( productToJson( product ) )
			}

			return {
				data      : json,
				statusCode: HttpStatus.OK
			}
		}
		catch ( e ) {
			return {
				statusCode: HttpStatus.BAD_REQUEST,
				message   : this.translation.translateAll( e )
			}
		}
	}

	parseGetAllProduct( dto: {
		from: number,
		to: number,
		name?: string,
	} ): {
		data: {
			from: ValidInteger
			to: ValidInteger
			name?: ValidString
		}
	}
	{
		const errors: BaseException[] = []

		const from = wrapType<ValidInteger, InvalidIntegerException>(
			() => ValidInteger.from( dto.from ) )

		if ( from instanceof InvalidIntegerException ) {
			errors.push( from )
		}

		const to = wrapType<ValidInteger, InvalidIntegerException>(
			() => ValidInteger.from( dto.to ) )

		if ( to instanceof InvalidIntegerException ) {
			errors.push( to )
		}

		const name = dto.name === undefined ? undefined : wrapType<ValidString, InvalidStringException>(
			() => ValidString.from( dto.name ?? '' ) )

		if ( errors.length > 0 ) {
			throw errors
		}

		return {
			data: {
				from: from as ValidInteger,
				to  : to as ValidInteger,
				name: name as ValidString
			}
		}
	}
}
