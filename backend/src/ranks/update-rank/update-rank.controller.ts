import {
	Body,
	Controller,
	HttpStatus,
	Put
} from '@nestjs/common'
import {
	ApiBody,
	ApiOperation,
	ApiResponse,
	ApiTags
} from '@nestjs/swagger'
import { RankDto } from 'src/ranks/dto/rank_dto'
import { TranslationService } from 'src/shared/services/translation/translation.service'
import { HttpResult } from 'src/shared/utils/HttpResult'
import { rankFromJson } from '~features/ranks/application/rank_mapper'
import { Rank } from '~features/ranks/domain/rank'
import { BaseException } from '~features/shared/domain/exceptions/BaseException'
import { UpdateRankService } from './update-rank.service'

@ApiTags( 'ranks' )
@Controller( 'ranks' )
export class UpdateRankController {
	constructor( private readonly updateRankService: UpdateRankService,
		private readonly translation: TranslationService
	)
	{}

	@Put( ':id' )
	@ApiBody( {
		schema: {
			type      : 'object',
			properties: {
				id          : {
					type   : 'string',
					example: 'a27a730c-3050-4d26-80b9-74163a3590fa'
				},
				user_email: {
					type   : 'string',
					example: 'aaaa@gmail.com'
				},
				product_code: {
					type   : 'string',
					example: 'abc2'
				},
				created_at  : {
					type   : 'string',
					example: '2024-04-27'
				},
				value       : {
					type   : 'string',
					example: '2'
				}
			}
		}
	} )
	@ApiOperation( {
		summary    : 'Update rank',
		description: 'Update rank by json data'
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
		@Body(  ) rank: RankDto
	): Promise<HttpResult>
	{
		try {
			const r = rankFromJson( rank )

			await this.updateRankService.updateRank( r as Rank)
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
