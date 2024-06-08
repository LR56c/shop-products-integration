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
import { BaseException } from '~features/shared/domain/exceptions/BaseException'
import { InvalidIntegerException } from '~features/shared/domain/exceptions/InvalidIntegerException'
import { InvalidStringException } from '~features/shared/domain/exceptions/InvalidStringException'
import { ValidInteger } from '~features/shared/domain/value_objects/valid_integer'
import { ValidString } from '~features/shared/domain/value_objects/valid_string'
import { wrapType } from '~features/shared/utils/wrap_type'
import { shopAddressToJson } from '~features/shop-address/application/shop-address-mapper'
import { TranslationService } from '../../shared/services/translation/translation.service'
import { HttpResultData } from '../../shared/utils/HttpResultData'
import { GetShopAddressService } from './get-shop-address.service'

@ApiTags( 'shops-address' )
@Controller( 'shops-address' )
export class GetShopAddressController {
	constructor( private readonly getShopAddressService: GetShopAddressService,
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
		summary    : 'Get shop address',
		description: 'Get shop address by name'
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
									name: {
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
	async getShopAddress(
		@Query( 'from' ) from: number,
		@Query( 'to' ) to: number,
		@Query( 'name' ) name?: string
	): Promise<HttpResultData<Record<string, any>>> {
		try {

			const { data } = this.parseGetShopAddress( {
				from,
				to,
				name
			} )

			const result = await this.getShopAddressService.getShopAddress(
				data.from,
				data.to,
				data.name
			)
			return {
				statusCode: HttpStatus.OK,
				data      : result.map(
					( shopAddress ) => shopAddressToJson( shopAddress ) )
			}
		}
		catch ( e ) {
			return {
				statusCode: HttpStatus.BAD_REQUEST,
				message   : this.translation.translateAll( e )
			}
		}

	}

	parseGetShopAddress( dto: {
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

		if ( name != undefined && name instanceof
			InvalidStringException )
		{
			throw [ new InvalidStringException( 'name' ) ]
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
