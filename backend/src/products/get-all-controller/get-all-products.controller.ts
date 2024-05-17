import {
	Controller,
	Get,
	HttpStatus,
	Query
} from '@nestjs/common'
import {
	ApiOperation,
	ApiQuery,
	ApiResponse,
	ApiTags
} from '@nestjs/swagger'
import { productResponseToJson } from '~features/products/application/product_mapper'
import { TranslationService } from '../../shared/services/translation/translation.service'
import { HttpResultData } from '../../shared/utils/HttpResultData'
import { GetAllProductsService } from './get-all-products.service'

@ApiTags( 'products' )
@Controller( 'products' )
export class GetAllProductsController {
	constructor(
		private readonly getAllControllerService: GetAllProductsService,
		private readonly translation: TranslationService
	)
	{}

	@Get()
	@ApiQuery( {
		name    : 'name',
		type    : String,
		required: false
	} )
	@ApiOperation( {
		summary    : 'Get all products',
		description: 'Get all products from a range of products, and optionally filter by name'
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
							type : 'array',
							items: {
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
	async getAll(
		@Query( 'from' ) from: number,
		@Query( 'to' ) to: number,
		@Query( 'name' ) name?: string
	): Promise<HttpResultData<Record<string, any>[]>> {
		try {

			const products = await this.getAllControllerService.getAll( from, to,
				name )

			let json: Record<string, any>[] = []
			for ( const product of products ) {
				json.push( productResponseToJson( product ) )
			}

			return {
				data      : json,
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
