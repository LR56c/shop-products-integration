import {
	Body,
	Controller,
	Post
} from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import {
	ApiBody,
	ApiTags
} from '@nestjs/swagger'
import { AverageRankService } from './average-rank.service'

@ApiTags( 'ranks' )
@Controller( 'ranks' )
export class AverageRankController {
	constructor( private readonly averageRankService: AverageRankService,
		private eventEmitter: EventEmitter2
	) {}

	@Post( 'average' )
	@ApiBody( {
		schema: {
			type      : 'object',
			properties:{
				code: {
					type   : 'string',
					example: 'abc'
				}
			}
		}
	} )
	async handle( @Body( 'code' ) code: string ) {
		this.eventEmitter.emit( 'rank.average', code)
		console.log( 'code', code )
		return true
	}

}
