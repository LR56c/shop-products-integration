import {
	Body,
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
import { TranslationService } from '../../shared/services/translation/translation.service'
import { HttpResultData } from '../../shared/utils/HttpResultData'
import { productToJson } from '~features/products/application/product_mapper'
import { BaseException } from '~features/shared/domain/exceptions/BaseException'
import { EmailException } from '~features/shared/domain/exceptions/EmailException'
import { Email } from '~features/shared/domain/value_objects/Email'
import { wrapType } from '~features/shared/utils/WrapType'
import { GetCartByUserEmailService } from './get-cart-by-user-email.service'

@ApiTags( 'carts' )
@Controller( 'carts' )
export class GetCartByUserEmailController {
	constructor( private readonly getCartByUserEmailService: GetCartByUserEmailService,
		private readonly translation: TranslationService )
	{}

	@Get( ':user_email' )
	@ApiOperation( {
		summary    : 'Get user cart',
		description: 'Get cart by user_email'
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
									user_email: {
										type   : 'string',
										example: 'string'
									},
									products  : {
										type : 'array',
										items: {
											type      : 'object',
											properties: {
												quantity: {
													type   : 'string',
													example: 'number'
												},
												product : {
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
	async getCartByUserEmail( @Param( 'user_email' ) user_email: string )
		: Promise<HttpResultData<Record<string, any>>>{
		try {

			const email = wrapType<Email, EmailException>(
				() => Email.from( user_email ) )

			if ( email instanceof BaseException ) {
				throw email
			}

			const result = await this.getCartByUserEmailService.getCartByUserEmail( email as Email )

			const jsonProducts = result.products.map( (c)=>{
				return {
					quantity: c.quantity.value,
					product : productToJson(c.product)
				}

			} )
			return {
				statusCode: HttpStatus.OK,
				data			: {
					user_email: result.userEmail.value,
					products  : jsonProducts
				}
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
