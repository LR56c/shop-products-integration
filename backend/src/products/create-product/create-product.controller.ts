import {
	Body,
	Controller,
	HttpStatus,
	Post
} from '@nestjs/common'
import {
	ApiBody,
	ApiOperation,
	ApiResponse,
	ApiTags
} from '@nestjs/swagger'
import { CreateProductDto } from 'src/products/create-product/create_product_dto'
import { TranslationService } from 'src/shared/services/translation/translation.service'
import { CreateProduct } from '~features/products/application/create_product'
import { Product } from '~features/products/domain/models/product'
import { HttpResult } from '../../shared/utils/HttpResult'
import { CreateProductService } from './create-product.service'

@ApiTags( 'products' )
@Controller( 'products' )
export class CreateProductController {
	constructor( private readonly createProductService: CreateProductService,
		private readonly translation: TranslationService )
	{}

	@Post()
	@ApiBody( {
		schema: {
			type      : 'object',
			properties: {
				product: {
					type      : 'object',
					properties: {
						code         : {
							type   : 'string',
							example: 'abc'
						},
						product_code : {
							type   : 'string',
							example: 'abc2'
						},
						name         : {
							type   : 'string',
							example: 'n'
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
							example: 2
						},
						description  : {
							type   : 'string',
							example: 'd'
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
		summary: 'Create a product',
		description: 'Create a product by json data',
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
	async createProduct(
		@Body( 'product' ) dto: CreateProductDto
	): Promise<HttpResult> {
		try {

			const productResult = await CreateProduct( {
				code         : dto.code,
				product_code : dto.product_code,
				name         : dto.name,
				description  : dto.description,
				brand        : dto.brand,
				image_url    : dto.image_url,
				price        : dto.price,
				stock        : dto.stock,
				category_name: dto.category
			} )

			await this.createProductService.createProduct( productResult as Product )

			return {
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
