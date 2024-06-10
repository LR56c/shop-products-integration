import {
	Body,
	Controller,
	HttpStatus,
	Post
} from '@nestjs/common'
import {
	ApiBody,
	ApiOperation,
	ApiResponse,
	ApiTags
} from '@nestjs/swagger'
import { HttpResult } from '../../shared/utils/HttpResult'
import { TranslationService } from '../../shared/services/translation/translation.service'
import { AverageRankService } from './average-rank.service'

@ApiTags( 'ranks' )
@Controller( 'ranks' )
export class AverageRankController {
	constructor( private readonly averageRankService: AverageRankService,
		private readonly translation: TranslationService )
	{}

	@Post( 'average' )
	@ApiBody( {
		schema: {
			type      : 'object',
			properties: {
				product_id: {
					type   : 'string',
					example: 'f9f2c7b5-29af-48b0-afbf-66106599f5e0'
				}
			}
		}
	} )
	@ApiOperation( {
		summary    : 'Calculate average rank',
		description: 'Calculate average rank by product_code'
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
	async handle( @Body( 'product_code' ) id: string ): Promise<HttpResult> {
		try {
			await this.averageRankService.execute( id )

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
