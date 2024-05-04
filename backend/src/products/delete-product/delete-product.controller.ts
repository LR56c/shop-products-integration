import {
	Body,
	Controller,
	Delete,
	HttpStatus,
	Param
} from '@nestjs/common'
import {
	ApiOperation,
	ApiResponse,
	ApiTags
} from '@nestjs/swagger'
import { InvalidStringException } from '~features/shared/domain/exceptions/InvalidStringException'
import { ValidString } from '~features/shared/domain/value_objects/ValidString'
import { wrapType } from '~features/shared/utils/WrapType'
import { HttpResult } from '../../shared/utils/HttpResult'
import { TranslationService } from '../../shared/services/translation/translation.service'
import { DeleteProductService } from './delete-product.service'


@ApiTags( 'products' )
@Controller( 'products' )
export class DeleteProductController {
	constructor( private readonly deleteProductService: DeleteProductService,
		private readonly translation: TranslationService )
	{}

	@Delete( ':product_code' )
	@ApiOperation( {
		summary: 'Delete product',
		description: 'Delete product by product_code'
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
	async deleteProduct(
		@Param( 'product_code' ) product_code: string
	): Promise<HttpResult> {
		try {

			const codeResult = wrapType<ValidString, InvalidStringException>(
				() => ValidString.from( product_code ) )

			if ( codeResult instanceof InvalidStringException ) {
				throw [new  InvalidStringException( 'product_code' )]
			}

			const product = await this.deleteProductService.deleteProduct(
				codeResult as ValidString )
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
