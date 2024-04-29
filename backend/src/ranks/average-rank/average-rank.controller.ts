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
import { TranslationService } from '../../shared/services/translation/translation.service'
import { HttpResult } from 'src/shared/utils/HttpResult'
import { AverageRankService } from './average-rank.service'

@ApiTags( 'ranks' )
@Controller( 'ranks' )
export class AverageRankController {
	constructor( private readonly averageRankService: AverageRankService,
		private readonly translation: TranslationService, ) {}

	@Post( 'average' )
	@ApiBody( {
		schema: {
			type      : 'object',
			properties: {
				code: {
					type   : 'string',
					example: 'abc'
				}
			}
		}
	} )
	async handle( @Body( 'code' ) code: string ): Promise<HttpResult> {
		try {
			await this.averageRankService.execute( code )

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
