import {
	Controller,
	Get,
	HttpStatus,
	Param
} from '@nestjs/common'
import {
	ApiOperation,
	ApiResponse,
	ApiTags
} from '@nestjs/swagger'
import { productResponseToJson } from '../../../packages/products/application/product_mapper'
import { TranslationService } from '../../shared/services/translation/translation.service'
import { HttpResultData } from '../../shared/utils/HttpResultData'
import { GetProductService } from './get-product.service'

@ApiTags( 'products' )
@Controller( 'products' )
export class GetProductController {
	constructor( private readonly getProductService: GetProductService,
		private readonly translation: TranslationService )
	{}


	@Get( ':id' )
	@ApiOperation( {
		summary    : 'Get product',
		description: 'Get product by id'
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
						},
						data      : {
							type      : 'object',
							properties: {
								id          : {
									type   : 'string',
									example: 'uuid'
								},
								code        : {
									type   : 'string',
									example: 'string'
								},
								product_code: {
									type   : 'string',
									example: 'string'
								},
								name        : {
									type   : 'string',
									example: 'string'
								},
								description : {
									type   : 'string',
									example: 'string'
								},
								created_at  : {
									type   : 'string',
									example: 'date'
								},
								brand       : {
									type   : 'string',
									example: 'string'
								},
								price       : {
									type   : 'string',
									example: 'number'
								},
								image_url   : {
									type   : 'string',
									example: 'url'
								},
								stock       : {
									type   : 'string',
									example: 'number'
								},
								average_rank: {
									type   : 'string',
									example: 'decimal'
								},
								category    : {
									type   : 'string',
									example: 'string'
								}
							}
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
	async getProduct(
		@Param( 'id' ) id: string
	): Promise<HttpResultData<Record<string, any>>> {
		try {

			const product = await this.getProductService.getProduct( id )

			return {
				data      : productResponseToJson( product ),
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
