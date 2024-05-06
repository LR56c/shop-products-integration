import {
	Body,
	Controller,
	HttpStatus,
	Param,
	Put
} from '@nestjs/common'
import {
	ApiBody,
	ApiOperation,
	ApiResponse,
	ApiTags
} from '@nestjs/swagger'
import { ProductDto } from '../shared/dto/product_dto'
import { TranslationService } from 'src/shared/services/translation/translation.service'
import { HttpResult } from 'src/shared/utils/HttpResult'
import { productFromJson } from '~features/products/application/product_mapper'
import { Product } from '~features/products/domain/models/product'
import { BaseException } from '~features/shared/domain/exceptions/BaseException'
import { InvalidStringException } from '~features/shared/domain/exceptions/InvalidStringException'
import { ValidString } from '~features/shared/domain/value_objects/ValidString'
import { wrapType } from '~features/shared/utils/WrapType'
import { UpdateProductService } from './update-product.service'

@ApiTags( 'products' )
@Controller( 'products' )
export class UpdateProductController {
	constructor( private readonly updateProductService: UpdateProductService,
		private readonly translation: TranslationService )
	{}

	@Put( ':product_code' )
	@ApiBody( {
		schema: {
			type      : 'object',
			properties: {
				product: {
					type      : 'object',
					properties: {
						id           : {
							type   : 'string',
							example: 'aab298c3-6b7e-4c3e-b6fc-0817bb49837a'
						},
						code         : {
							type   : 'string',
							example: 'abc'
						},
						product_code         : {
							type   : 'string',
							example: 'abc2'
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
							example: 'http://img.com/img.jpg'
						},
						stock        : {
							type   : 'number',
							example: 2.0
						},
						average_rank         : {
							type   : 'number',
							example: 2
						},
						category: {
							type   : 'string',
							example: 'TEST'
						}
					}
				}
			}
		}
	} )
	@ApiOperation( {
		summary: 'Update a product',
		description: 'Update a product by product_code and json data',
	} )
	@ApiResponse( {
		status     : 200,
		content: {
			'application/json': {
				schema: {
					type: 'object',
					properties: {
						statusCode: {
							type   : 'number',
							example: 200
						}
					}
				}
			}
		}
	} )
	@ApiResponse( {
		status     : 400,
		content: {
			'application/json': {
				schema: {
					type: 'object',
					properties: {
						statusCode: {
							type   : 'number',
							example: 400
						},
						message: {
							type      : 'object',
							properties: {
								code_error   : {
									type   : 'string',
									example: 'error translation'
								},
							}
						}
					}
				}
			}
		}
	} )
	@ApiResponse( {
		status     : 500,
		description: 'Internal server error by external operations',
		content: {
			'application/json': {
				schema: {
					type: 'object',
					properties: {
						statusCode: {
							type   : 'number',
							example: 500
						},
					}
				}
			}
		}
	} )
	async updateProduct(
		@Param( 'product_code' ) product_code : string,
		@Body( 'product' ) dto: ProductDto
	): Promise<HttpResult> {
		try {
			const product_codeResult = wrapType<ValidString, InvalidStringException>(
				() => ValidString.from( product_code ) )

			if ( product_codeResult instanceof InvalidStringException ) {
				throw [new InvalidStringException('product_code')]
			}

			const p = productFromJson( dto )

			if ( !( p instanceof Product ) ) {
				return {
					statusCode: HttpStatus.BAD_REQUEST,
					message   : this.translation.translateAll( p as BaseException[] )
				}
			}

			await this.updateProductService.updateProduct(product_codeResult as ValidString, p as Product )

			return {
				statusCode: HttpStatus.OK
			}
		}
		catch ( e ) {
			return {
				statusCode: HttpStatus.INTERNAL_SERVER_ERROR
			}
		}
	}
}

