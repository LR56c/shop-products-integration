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
import { TranslationService } from '../../shared/services/translation/translation.service'
import { HttpResultData } from '../../shared/utils/HttpResultData'
import { productToJson } from '~features/products/application/product_mapper'
import { BaseException } from '~features/shared/domain/exceptions/BaseException'
import { EmailException } from '~features/shared/domain/exceptions/EmailException'
import { InvalidIntegerException } from '~features/shared/domain/exceptions/InvalidIntegerException'
import { Email } from '~features/shared/domain/value_objects/Email'
import { ValidInteger } from '~features/shared/domain/value_objects/ValidInteger'
import { ValidString } from '~features/shared/domain/value_objects/ValidString'
import { wrapType } from '~features/shared/utils/WrapType'
import { GetAllCartService } from './get-all-cart.service'

@ApiTags( 'carts' )
@Controller( 'carts' )
export class GetAllCartController {
	constructor( private readonly getAllCartService: GetAllCartService,
		private readonly translation: TranslationService )
	{}

	@Get()
	@ApiQuery( {
		name    : 'user_email',
		type    : String,
		required: false
	} )
	@ApiOperation( {
		summary    : 'Get all cart',
		description: 'Get all cart from range. Optionally, you can filter by user_email'
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
									user_email          : {
										type   : 'string',
										example: 'string'
									},
									quantity          : {
										type   : 'string',
										example: 'number'
									},
									product: {
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
,
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
	async getAllCart(
		@Query( 'from' ) from: number,
		@Query( 'to' ) to: number,
		@Query( 'user_email' ) user_email?: string
	): Promise<HttpResultData<Record<string, any>[]>>
	{
		try {

			const { data } = this.parseGetAllCarts( {
				from,
				to,
				user_email
			} )

			const result = await this.getAllCartService.getAllCart(
				data.from,
				data.to,
				data.user_email
			)

			const json = result.map( cart => {
				return {
					user_email: cart.userEmail.value,
					quantity: cart.quantity.value,
					product: productToJson( cart.product )
				}
			} )

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

	parseGetAllCarts( dto: {
		from: number,
		to: number,
		user_email?: string,
	} ): {
		data: {
			from: ValidInteger
			to: ValidInteger
			user_email?: Email
		}
	}
	{
		const errors: BaseException[] = []

		const from = wrapType<ValidInteger, InvalidIntegerException>(
			() => ValidInteger.from( dto.from ) )

		if ( from instanceof InvalidIntegerException ) {
			errors.push( new InvalidIntegerException( 'from' ) )
		}

		const to = wrapType<ValidInteger, InvalidIntegerException>(
			() => ValidInteger.from( dto.to ) )

		if ( to instanceof InvalidIntegerException ) {
			errors.push( new InvalidIntegerException( 'to' ) )
		}

		const user_email = dto.user_email === undefined
			? undefined
			: wrapType<Email, EmailException>(
				() => Email.from( dto.user_email ?? '' ) )

		if ( user_email != undefined && user_email instanceof EmailException ) {
			errors.push( new EmailException() )
		}

		if ( errors.length > 0 ) {
			throw errors
		}

		return {
			data: {
				from      : from as ValidInteger,
				to        : to as ValidInteger,
				user_email: user_email as ValidString
			}
		}
	}
}
