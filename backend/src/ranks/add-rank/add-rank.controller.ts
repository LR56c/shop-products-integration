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
import { AddRank } from '~features/ranks/application/add_rank'
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
		@Body( 'rank' ) rank: number
	): Promise<HttpResult>
	{
		try {

			const rankResult = await AddRank( {
				code, rank
			} )

			await this.addRankService.execute( rankResult )
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
