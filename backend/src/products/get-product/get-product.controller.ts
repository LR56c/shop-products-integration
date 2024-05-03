import {
	Controller,
	Get,
	HttpStatus,
	Param
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { HttpResultData } from 'src/shared/utils/HttpResultData'
import { productToJson } from '~features/products/application/product_mapper'
import { InvalidStringException } from '~features/shared/domain/exceptions/InvalidStringException'
import { ValidString } from '~features/shared/domain/value_objects/ValidString'
import { wrapType } from '~features/shared/utils/WrapType'
import { TranslationService } from '../../shared/services/translation/translation.service'
import { GetProductService } from './get-product.service'

@ApiTags( 'products' )
@Controller( 'products' )
export class GetProductController {
	constructor( private readonly getProductService: GetProductService,
		private readonly translation: TranslationService )
	{}


	@Get( ':code' )
	async getProduct(
		@Param( 'code' ) code: string
	): Promise<HttpResultData<Record<string, any>>> {
		try {

			const codeResult = wrapType<ValidString, InvalidStringException>(
				() => ValidString.from( code ) )

			if ( codeResult instanceof InvalidStringException ) {
				throw codeResult
			}

			const product = await this.getProductService.getProduct( codeResult as ValidString )

			return {
				data      : productToJson( product ),
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
