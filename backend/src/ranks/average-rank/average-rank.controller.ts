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
import { InvalidStringException } from '~features/shared/domain/exceptions/InvalidStringException'
import { ValidString } from '~features/shared/domain/value_objects/ValidString'
import { wrapType } from '~features/shared/utils/WrapType'
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

			const product_codeResult = wrapType<ValidString, InvalidStringException>(
				() => ValidString.from( code ) )

			if ( product_codeResult instanceof InvalidStringException) {
				throw [new InvalidStringException('product_code')]

			}

			await this.averageRankService.execute( product_codeResult as ValidString )

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
