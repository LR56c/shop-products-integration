import {
	Body,
	Controller,
	HttpStatus,
	Put
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { TranslationService } from 'src/shared/services/translation/translation.service'
import { HttpResult } from 'src/shared/utils/HttpResult'
import { productFromJson } from '~features/products/application/product_mapper'
import { Product } from '~features/products/domain/models/product'
import { UpdateProductService } from './update-product.service'

@ApiTags( 'products' )
@Controller( 'products' )
export class UpdateProductController {
	constructor( private readonly updateProductService: UpdateProductService,
		private readonly translation: TranslationService )
	{}

	@Put()
	async updateProduct(
		@Body( 'code' ) code: string,
		@Body( 'product' ) product: any
	): Promise<HttpResult> {
		try {

			const p = productFromJson( product )

			if ( !( p instanceof Product ) ) {
				return {
					statusCode: HttpStatus.BAD_REQUEST,
					message   : this.translation.translateAll( p )
				}
			}

			const productResult = await this.updateProductService.updateProduct( code,
				p as Product )

			return {
				statusCode: HttpStatus.OK
			}
		}
		catch ( e ) {
			return {
				statusCode: HttpStatus.BAD_REQUEST
			}
		}
	}
}

