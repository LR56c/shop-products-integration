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
import { GetAllProductsService } from 'src/products/get-all-controller/get-all-products.service'
import { TranslationService } from 'src/shared/services/translation/translation.service'
import { HttpResultData } from 'src/shared/utils/HttpResultData'
import { productToJson } from '~features/products/application/product_mapper'
import { BaseException } from '~features/shared/domain/exceptions/BaseException'
import { InvalidIntegerException } from '~features/shared/domain/exceptions/InvalidIntegerException'
import { InvalidStringException } from '~features/shared/domain/exceptions/InvalidStringException'
import { ValidInteger } from '~features/shared/domain/value_objects/ValidInteger'
import { ValidString } from '~features/shared/domain/value_objects/ValidString'
import { wrapType } from '~features/shared/utils/WrapType'

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
		summary: 'Get all products',
		description: 'Get all products from a range of products, and optionally filter by name',
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

			const { data } = this.parseGetAllProduct( { from, to, name } )

			const products = await this.getAllControllerService.getAll( data.from,
				data.to, data.name )

			let json: Record<string, any>[] = []
			for ( const product of products ) {
				json.push( productToJson( product ) )
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

	parseGetAllProduct( dto: {
		from: number,
		to: number,
		name?: string,
	} ): {
		data: {
			from: ValidInteger
			to: ValidInteger
			name?: ValidString
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

		const name = dto.name === undefined
			? undefined
			: wrapType<ValidString, InvalidStringException>(
				() => ValidString.from( dto.name ?? '' ) )

		if ( name != undefined && name instanceof InvalidStringException ) {
			errors.push( new InvalidStringException( 'name' ) )
		}

		if ( errors.length > 0 ) {
			throw errors
		}

		return {
			data: {
				from: from as ValidInteger,
				to  : to as ValidInteger,
				name: name as ValidString
			}
		}
	}
}
