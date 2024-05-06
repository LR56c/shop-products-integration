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


	@Get( ':product_code' )
	@ApiOperation( {
		summary: 'Get product',
		description: 'Get product by product_code',
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
						},
						data			: {
							type: 'object',
							properties: {
								id           : {
									type   : 'string',
									example: 'uuid'
								},
								code         : {
									type   : 'string',
									example: 'string'
								},
								product_code         : {
									type   : 'string',
									example: 'string'
								},
								name         : {
									type   : 'string',
									example: 'string'
								},
								description  : {
									type   : 'string',
									example: 'string'
								},
								created_at    : {
									type   : 'string',
									example: 'date'
								},
								brand  : {
									type   : 'string',
									example: 'string'
								},
								price  : {
									type   : 'string',
									example: 'number'
								},
								image_url  : {
									type   : 'string',
									example: 'url'
								},
								stock  : {
									type   : 'string',
									example: 'number'
								},
								average_rank  : {
									type   : 'string',
									example: 'decimal'
								},
								category  : {
									type   : 'string',
									example: 'string'
								},
							}
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
	async getProduct(
		@Param( 'product_code' ) product_code: string
	): Promise<HttpResultData<Record<string, any>>> {
		try {

			const product_codeResult = wrapType<ValidString, InvalidStringException>(
				() => ValidString.from( product_code ) )

			if ( product_codeResult instanceof InvalidStringException ) {
				throw [new InvalidStringException('product_code')]
			}

			const product = await this.getProductService.getProduct( product_codeResult as ValidString )

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
