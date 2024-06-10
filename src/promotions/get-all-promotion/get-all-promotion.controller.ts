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
import { promotionResponseToJson } from '../../../packages/discount_type/features/promotions/application/promotion_mapper'
import { TranslationService } from '../../shared/services/translation/translation.service'
import { HttpResultData } from '../../shared/utils/HttpResultData'
import { GetAllPromotionService } from './get-all-promotion.service'

@ApiTags( 'promotions' )
@Controller( 'promotions' )
export class GetAllPromotionController {
	constructor( private readonly getAllPromotionService: GetAllPromotionService,
		private readonly translation: TranslationService
	)
	{}

	@Get()
	@ApiQuery( {
		name    : 'name',
		type    : String,
		required: false
	} )
	@ApiQuery( {
		name    : 'from_date',
		type    : Date,
		required: false
	} )
	@ApiQuery( {
		name    : 'to_date',
		type    : Date,
		required: false
	} )
	@ApiOperation( {
		summary    : 'Get all promotions',
		description: 'Get all promotions from a range of dates'
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
								properties: {
									id        : {
										type   : 'string',
										example: 'uuid'
									},
									name      : {
										type   : 'string',
										example: 'string'
									},
									percentage: {
										type   : 'string',
										example: 'decimal'
									},
									create_at : {
										type   : 'string',
										example: 'date'
									},
									end_date  : {
										type   : 'string',
										example: 'date'
									},
									start_date: {
										type   : 'string',
										example: 'date'
									},
									products  : {
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
													example: 'integer'
												},
												image_url   : {
													type   : 'string',
													example: 'string'
												},
												stock       : {
													type   : 'string',
													example: 'integer'
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
		@Query( 'name' ) name?: string,
		@Query( 'from_date' ) from_date?: string,
		@Query( 'to_date' ) to_date?: string
	): Promise<HttpResultData<Record<string, any>[]>> {
		try {
			const promotions                = await this.getAllPromotionService.execute(
				from, to, name, from_date, to_date )
			let json: Record<string, any>[] = []
			for ( const p of promotions ) {
				json.push( promotionResponseToJson( p ) )
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
