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
import { saleToJson } from '../../../packages/discount_type/features/sales/application/sale_mapper'
import { TranslationService } from '../../shared/services/translation/translation.service'
import { HttpResultData } from 'src/shared/utils/HttpResultData'
import { GetSaleService } from './get-sale.service'

@ApiTags( 'sales' )
@Controller( 'sales' )
export class GetSaleController {
	constructor( private readonly getSaleService: GetSaleService,
		private readonly translation: TranslationService
	)
	{}

	@Get( ':id' )
	@ApiOperation( {
		summary    : 'Get sale',
		description: 'Get sale by id'
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
								product_id: {
									type   : 'string',
									example: 'uuid'
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
	async getSale(
		@Param( 'id' ) id: string
	): Promise<HttpResultData<Record<string, any>>> {
		try {
			const result = await this.getSaleService.getSale( id )

			return {
				statusCode: HttpStatus.OK,
				data      : saleToJson( result )
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
