import {
	Controller,
	Get,
	HttpStatus,
	Param
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { rankToJson } from '~features/ranks/application/rank_mapper'
import { HttpResultData } from '../../shared/utils/HttpResultData'
import { TranslationService } from '../../shared/services/translation/translation.service'
import { GetAllRankByCodeService } from './get-all-rank-by-code.service'

@ApiTags( 'ranks' )
@Controller( 'ranks' )
export class GetAllRankByCodeController {
	constructor( private readonly getAllRankByCodeService: GetAllRankByCodeService,
		private readonly translation: TranslationService )
	{}

	@Get( ':code' )
	async handle( @Param(
		'code' ) code: string ): Promise<HttpResultData<Record<string, any>[]>> {
		try {
			const result = await this.getAllRankByCodeService.execute( code )

			let json: Record<string, any>[] = []
			for ( const r of result ) {
				json.push( rankToJson( r ) )
			}

			return {
				data      : json,
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
