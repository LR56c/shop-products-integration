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
import { rankToJson } from '../../../packages/ranks/application/rank_mapper'
import { TranslationService } from '../../shared/services/translation/translation.service'
import { HttpResultData } from '../../shared/utils/HttpResultData'
import { GetAllRankByCodeService } from './get-all-rank-by-code.service'

@ApiTags( 'ranks' )
@Controller( 'ranks' )
export class GetAllRankByCodeController {
	constructor( private readonly getAllRankByCodeService: GetAllRankByCodeService,
		private readonly translation: TranslationService )
	{}

	@Get( ':product_code' )
	@ApiOperation( {
		summary    : 'Get all rank',
		description: 'Get all rank by code'
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
									created_at  : {
										type   : 'string',
										example: 'date'
									},
									value       : {
										type   : 'string',
										example: 'integer'
									},
									product_code: {
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
	async handle( @Param(
		'product_code' ) product_code: string ): Promise<HttpResultData<Record<string, any>[]>> {
		try {
			const result = await this.getAllRankByCodeService.execute( product_code )

			let json: Record<string, any>[] = []
			for ( const r of result ) {
				json.push( rankToJson( r ) )
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
