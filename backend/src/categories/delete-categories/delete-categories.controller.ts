import {
	Body,
	Controller,
	Delete,
	HttpStatus
} from '@nestjs/common'
import {
	ApiBody,
	ApiOperation,
	ApiResponse,
	ApiTags
} from '@nestjs/swagger'
import { Category } from '~features/categories/domain/category'
import { InvalidStringException } from '~features/shared/domain/exceptions/InvalidStringException'
import { ValidString } from '~features/shared/domain/value_objects/ValidString'
import { wrapType } from '~features/shared/utils/WrapType'
import { TranslationService } from '../../shared/services/translation/translation.service'
import { HttpResult } from '../../shared/utils/HttpResult'
import { DeleteCategoriesService } from './delete-categories.service'

@ApiTags( 'categories' )
@Controller( 'categories' )
export class DeleteCategoriesController {
	constructor( private readonly deleteCategoriesService: DeleteCategoriesService,
		private readonly translation: TranslationService
	)
	{}

	@Delete()
	@ApiBody( {
		schema: {
			type      : 'object',
			properties: {
				name: {
					type   : 'string',
					example: 'T'
				}
			}
		}
	} )
	@ApiOperation( {
		summary    : 'Delete category',
		description: 'Delete category by name'
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
		@Body( 'name' ) name: string
	): Promise<HttpResult> {
		try {

			const nameResult = wrapType<ValidString, InvalidStringException>(
				() => ValidString.from( name ) )

			if ( nameResult instanceof InvalidStringException ) {
				throw [ new InvalidStringException( 'name' ) ]
			}

			await this.deleteCategoriesService.deleteCategory(
				new Category( nameResult as ValidString )
			)
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
