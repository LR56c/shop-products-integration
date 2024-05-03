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
						description  : {
							type   : 'string',
							example: 'd'
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
						rank         : {
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
	@ApiOperation( {
		summary: 'Create a product'
	} )
	@ApiResponse( {
		status     : 200,
		description: 'CODE: 200. The product has been successfully created.'
	} )
	@ApiResponse( {
		status     : 400,
		description: 'CODE: 400 with translation. The product could not be created.'
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
				category_name: dto.category_name
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
