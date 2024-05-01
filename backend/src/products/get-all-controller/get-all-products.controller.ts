import {
	Controller,
	Get,
	HttpStatus,
	Query
} from '@nestjs/common'
import {
	ApiTags
} from '@nestjs/swagger'
import { GetAllProductsService } from 'src/products/get-all-controller/get-all-products.service'
import { TranslationService } from 'src/shared/services/translation/translation.service'
import { productToJson } from '~features/products/application/product_mapper'
import { HttpResultData } from 'src/shared/utils/HttpResultData'

@ApiTags( 'products' )
@Controller( 'products' )
export class GetAllProductsController {
	constructor(
		private readonly getAllControllerService: GetAllProductsService,
		private readonly translation: TranslationService
	)
	{}

	@Get()
	async getAll(
		@Query( 'from' ) from: number,
		@Query( 'to' ) to: number
	): Promise<HttpResultData<Record<string, any>[]>> {
		try {
			const products = await this.getAllControllerService.getAll( from, to )

			let json : Record<string, any>[] = []
			for ( const product of products ) {
				json.push( productToJson( product ) )
			}

			return {
				data: json,
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
}
