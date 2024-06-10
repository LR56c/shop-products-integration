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
import { categoryToJson } from '../../../packages/categories/application/category_mapper'
import { TranslationService } from '../../shared/services/translation/translation.service'
import { HttpResultData } from '../../shared/utils/HttpResultData'
import { GetCategoriesService } from './get-categories.service'

@ApiTags( 'categories' )
@Controller( 'categories' )
export class GetCategoriesController {
	constructor( private readonly getCategoriesService: GetCategoriesService,
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
		summary    : 'Get categories',
		description: 'Get categories by name'
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
	async getCategories(
		@Query( 'from' ) from: number,
		@Query( 'to' ) to: number,
		@Query( 'name' ) name?: string
	): Promise<HttpResultData<Record<string, any>>> {
		try {
			const result = await this.getCategoriesService.getCategories( from, to,
				name )
			return {
				statusCode: HttpStatus.OK,
				data      : result.map(
					( shopAddress ) => categoryToJson( shopAddress ) )
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
