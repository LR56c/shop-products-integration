
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
import { TranslationService } from '../../shared/services/translation/translation.service'
import { HttpResultData } from 'src/shared/utils/HttpResultData'
import {
	promotionResponseToJson,
	promotionToJson
} from '~features/discount_type/features/promotions/application/promotion_mapper'
import { BaseException } from '~features/shared/domain/exceptions/BaseException'
import { InvalidUUIDException } from '~features/shared/domain/exceptions/InvalidUUIDException'
import { UUID } from '~features/shared/domain/value_objects/UUID'
import { wrapType } from '~features/shared/utils/WrapType'
import { GetPromotionService } from './get-promotion.service'

@ApiTags( 'promotions' )
@Controller( 'promotions' )
export class GetPromotionController {
	constructor( private readonly getPromotionService: GetPromotionService,
		private readonly translation: TranslationService
	)
	{}

	@Get( ':id' )
	@ApiOperation( {
		summary    : 'Get promotion',
		description: 'Get promotion by id'
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
							type      : 'object',
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
	async getOrder(
		@Param( 'id' ) id: string
	): Promise<HttpResultData<Record<string, any>>> {
		try {

			const result = await this.getPromotionService.execute( id )

			return {
				statusCode: HttpStatus.OK,
				data      : promotionResponseToJson( result )
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
