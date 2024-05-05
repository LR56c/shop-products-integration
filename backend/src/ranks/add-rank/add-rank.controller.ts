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
import { HttpResult } from 'src/shared/utils/HttpResult'
import { AddRank } from '~features/ranks/application/add_rank'
import { TranslationService } from '../../shared/services/translation/translation.service'
import { AddRankService } from './add-rank.service'

@ApiTags( 'ranks' )
@Controller( 'ranks' )
export class AddRankController {
	constructor( private readonly addRankService: AddRankService,
		private readonly translation: TranslationService
	)
	{}

	@Post()
	@ApiBody( {
		schema: {
			type      : 'object',
			properties: {
				product_code: {
					type   : 'string',
					example: 'abc2'
				},
				user_email: {
					type   : 'string',
					example: 'aaaa@gmail.com'
				},
				rank: {
					type   : 'number',
					example: 2
				}
			}
		}
	} )
	@ApiOperation( {
		summary: 'Add rank',
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
	async handle(
		@Body( 'product_code' ) code: string,
		@Body( 'rank' ) rank: number,
		@Body( 'user_email' ) user_email: string
	): Promise<HttpResult>
	{
		try {

			const rankResult = await AddRank( {
				code, user_email, rank
			} )

			await this.addRankService.execute( rankResult )
			return {
				statusCode: HttpStatus.OK
			}
		}
		catch ( e ) {
			return {
					statusCode: HttpStatus.BAD_REQUEST,
					message   : this.translation.translateAll(e)
			}
		}
	}
}
