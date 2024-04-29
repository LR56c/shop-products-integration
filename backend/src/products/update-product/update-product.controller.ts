import {
	Body,
	Controller,
	HttpStatus,
	Param,
	Put
} from '@nestjs/common'
import {
	ApiBody,
	ApiTags
} from '@nestjs/swagger'
import { TranslationService } from 'src/shared/services/translation/translation.service'
import { HttpResult } from 'src/shared/utils/HttpResult'
import { productFromJson } from '~features/products/application/product_mapper'
import { Product } from '~features/products/domain/models/product'
import { BaseException } from '~features/shared/domain/exceptions/BaseException'
import { UpdateProductService } from './update-product.service'

@ApiTags( 'products' )
@Controller( 'products' )
export class UpdateProductController {
	constructor( private readonly updateProductService: UpdateProductService,
		private readonly translation: TranslationService )
	{}

	@Put( ':code' )
	@ApiBody( {
		schema: {
			type      : 'object',
			properties: {
				product: {
					type      : 'object',
					properties: {
						id           : {
							type   : 'string',
							example: '5bddb4cd-effb-4b49-a295-a8ad7dea82f1'
						},
						code         : {
							type   : 'string',
							example: 'abc'
						},
						product_code         : {
							type   : 'string',
							example: 'abc'
						},
						name         : {
							type   : 'string',
							example: 'n'
						},
						description  : {
							type   : 'string',
							example: 'd'
						},
						created_at    : {
							type   : 'string',
							example: '2024-04-27'
						},
						brand        : {
							type   : 'string',
							example: 'b'
						},
						price        : {
							type   : 'number',
							example: 2
						},
						image_url    : {
							type   : 'string',
							example: 'http://img'
						},
						stock        : {
							type   : 'number',
							example: 2
						},
						average_rank         : {
							type   : 'number',
							example: 2
						},
						category_name: {
							type   : 'string',
							example: 'TEST'
						}
					}
				}
			}
		}
	} )
	async updateProduct(
		@Body( 'product' ) body: any
	): Promise<HttpResult> {
		try {
			const p = productFromJson( body )

			if ( !( p instanceof Product ) ) {
				return {
					statusCode: HttpStatus.BAD_REQUEST,
					message   : this.translation.translateAll( p as BaseException[] )
				}
			}

			await this.updateProductService.updateProduct( p as Product )

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

