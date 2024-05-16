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
import { TranslationService } from '../../shared/services/translation/translation.service'
import { HttpResult } from '../../shared/utils/HttpResult'
import { PromotionDto } from '../shared/promotion_dto'
import { CreatePromotionService } from './create-promotion.service'

@ApiTags( 'promotions' )
@Controller( 'promotions' )
export class CreatePromotionController {
	constructor( private readonly createPromotionService: CreatePromotionService,
		private readonly translation: TranslationService
	)
	{}

	@Post()
	@ApiBody( {
			schema: {
				type      : 'object',
				properties: {
					name      : {
						type   : 'string',
						example: 'abc'
					},
					percentage: {
						type   : 'number',
						example: 20
					},
					created_at: {
						type   : 'string',
						example: '2024-04-27'
					},
					end_date  : {
						type   : 'string',
						example: '2024-04-27'
					},
					start_date: {
						type   : 'string',
						example: '2024-04-27'
					},
					products  : {
						type : 'array',
						items: {
							type      : 'object',
							properties: {
								quantity  : {
									type   : 'number',
									example: 1
								},
								product_id: {
									type   : 'string',
									example: '359b6378-f875-4d31-b415-d3de60a59875'
								}
							}
						}
					}
				}
			}
		}
	)
	@ApiOperation( {
		summary    : 'Create a promotion',
		description: 'Create a promotion with json data'
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
		@Body() promotionDto: PromotionDto
	): Promise<HttpResult> {
		try {

			await this.createPromotionService.execute(promotionDto)

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
