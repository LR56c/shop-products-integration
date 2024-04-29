import {
	Body,
	Controller,
	HttpStatus,
	Post
} from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import {
	ApiBody,
	ApiTags
} from '@nestjs/swagger'
import { TranslationService } from '../../shared/services/translation/translation.service'
import { HttpResult } from 'src/shared/utils/HttpResult'
import { ProductRankUpdateEvent } from '~features/shared/domain/events/product_rank_update_event'
import { AverageRankService } from './average-rank.service'

@ApiTags( 'ranks' )
@Controller( 'ranks' )
export class AverageRankController {
	constructor( private readonly averageRankService: AverageRankService,
		private readonly translation: TranslationService,
		private eventEmitter: EventEmitter2
	)
	{}

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
			const value = await this.averageRankService.execute( code )
			this.eventEmitter.emit( ProductRankUpdateEvent.tag, {
				product_code: code,
				average_value: value
			})
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
