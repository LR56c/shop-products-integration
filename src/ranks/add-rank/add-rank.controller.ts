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
import { CreateRankDto } from 'src/ranks/dto/create_rank_dto'
import { HttpResult } from 'src/shared/utils/HttpResult'
import { AddRank } from 'packages/ranks/application/add_rank'
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
				rank: {
					type			: 'object',
					properties:{
						product_code: {
							type   : 'string',
							example: 'abc2'
						},
						user_email  : {
							type   : 'string',
							example: 'aaaa@gmail.com'
						},
						value        : {
							type   : 'number',
							example: 2
						}
					}
				}
			}
		}
	} )
	@ApiOperation( {
		summary: 'Add rank'
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
	async handle(
		@Body( 'rank' ) rank: CreateRankDto
	): Promise<HttpResult>
	{
		try {
			await this.addRankService.execute( rank )
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
