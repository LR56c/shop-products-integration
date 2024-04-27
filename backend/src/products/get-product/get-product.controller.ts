import {
  Controller,
  Get,
  HttpStatus,
  Param
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Product } from '~features/products/domain/models/product'
import { TranslationService } from '../../shared/services/translation/translation.service'
import { GetProductService } from './get-product.service'
import { HttpResultData } from 'src/shared/utils/HttpResultData'

@ApiTags( 'products' )
@Controller( 'products' )
export class GetProductController {
	constructor( private readonly getProductService: GetProductService,
		private readonly translation: TranslationService )
	{}


	@Get( ':code' )
	async getProduct(
		@Param( 'code' ) code: string
	): Promise<HttpResultData<Product>> {
		try {
			const product = await this.getProductService.getProduct( code );
			return {
				data      : product,
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
