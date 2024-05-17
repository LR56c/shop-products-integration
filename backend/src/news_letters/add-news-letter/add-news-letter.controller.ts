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
import { newsLetterFromJson } from '~features/news_letter/application/news_letter_mapper'
import { TranslationService } from '../../shared/services/translation/translation.service'
import { HttpResult } from '../../shared/utils/HttpResult'
import { AddNewsLetterService } from './add-news-letter.service'
import { NewsLetterDto } from '../dto/news_letter_dto'
import { NewsLetter } from '~features/news_letter/domain/news_letter'

@ApiTags( 'news-letters' )
@Controller( 'news-letters' )
export class AddNewsLetterController {
	constructor( private readonly addNewsLetterService: AddNewsLetterService,
		private readonly translation: TranslationService )
	{}

	@Post()
	@ApiBody( {
		schema: {
			type      : 'object',
			properties: {
				email          : {
					type   : 'string',
					example: 'aaaa@gmail.com'
				},
				name          : {
					type   : 'string',
					example: 'John'
				},
				created_at  : {
					type   : 'string',
					example: '2024-04-27'
				}
			}
		}
	} )
	@ApiOperation( {
		summary: 'Create a news letter',
		description: 'Create a news letter by json data',
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
	async addNewsLetter( @Body() dto: NewsLetterDto ): Promise<HttpResult> {
		try {

			await this.addNewsLetterService.addNewsLetter( dto )

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
