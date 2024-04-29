import {
	Body,
	Controller,
	HttpStatus,
	Post
} from '@nestjs/common'
import {
	ApiBody,
	ApiTags
} from '@nestjs/swagger'
import { HttpResult } from 'src/shared/utils/HttpResult'
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
				code: {
					type   : 'string',
					example: 'abc'
				},
				rank: {
					type   : 'string',
					example: 'abc'
				}
			}
		}
	} )
	async handle(
		@Body( 'code' ) code: string,
		@Body( 'rank' ) rank: string
	): Promise<HttpResult>
	{
		try {
			await this.addRankService.execute( code, rank )
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
