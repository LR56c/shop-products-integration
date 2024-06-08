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
import { PartialProductDto } from 'src/products/shared/dto/partial_product_dto'
import { TranslationService } from 'src/shared/services/translation/translation.service'
import { HttpResult } from 'src/shared/utils/HttpResult'
import { UpdateProductService } from './update-product.service'

@ApiTags( 'products' )
@Controller( 'products' )
export class UpdateProductController {
	constructor( private readonly updateProductService: UpdateProductService,
		private readonly translation: TranslationService )
	{}

	@Put( ':id' )
	@ApiBody( {
		schema: {
			type      : 'object',
			properties: {
				product: {
					type      : 'object',
					properties: {
						code        : {
							type   : 'string',
							example: 'abc'
						},
						product_code: {
							type   : 'string',
							example: 'abc2'
						},
						name        : {
							type   : 'string',
							example: 'n'
						},
						description : {
							type   : 'string',
							example: 'd'
						},
						created_at  : {
							type   : 'string',
							example: '2024-04-27'
						},
						brand       : {
							type   : 'string',
							example: 'b'
						},
						price       : {
							type   : 'number',
							example: 2
						},
						image_url   : {
							type   : 'string',
							example: 'http://img.com/img.jpg'
						},
						stock       : {
							type   : 'number',
							example: 2.0
						},
						average_rank: {
							type   : 'number',
							example: 2
						},
						category    : {
							type   : 'string',
							example: 'TEST'
						}
					}
				}
			}
		}
	} )
	@ApiOperation( {
		summary    : 'Update a product',
		description: 'Update a product by id and json data'
	} )
	@ApiResponse( {
		status : 200,
		content: {
			'application/json': {
				schema: {
					type      : 'object',
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
		status : 400,
		content: {
			'application/json': {
				schema: {
					type      : 'object',
					properties: {
						statusCode: {
							type   : 'number',
							example: 400
						},
						message   : {
							type      : 'object',
							properties: {
								code_error: {
									type   : 'string',
									example: 'error translation'
								}
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
		content    : {
			'application/json': {
				schema: {
					type      : 'object',
					properties: {
						statusCode: {
							type   : 'number',
							example: 500
						}
					}
				}
			}
		}
	} )
	async updateProduct(
		@Param( 'id' ) id: string,
		@Body( 'product' ) dto: PartialProductDto
	): Promise<HttpResult> {
		try {
			await this.updateProductService.updateProduct( id, dto )

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

