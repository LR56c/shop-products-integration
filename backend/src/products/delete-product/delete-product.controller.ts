import {
	Body,
	Controller,
	Delete,
	HttpStatus,
	Param
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { InvalidStringException } from '~features/shared/domain/exceptions/InvalidStringException'
import { ValidString } from '~features/shared/domain/value_objects/ValidString'
import { wrapType } from '~features/shared/utils/WrapType'
import { HttpResult } from '../../shared/utils/HttpResult'
import { TranslationService } from '../../shared/services/translation/translation.service'
import { DeleteProductService } from './delete-product.service'


@ApiTags( 'products' )
@Controller( 'products' )
export class DeleteProductController {
	constructor( private readonly deleteProductService: DeleteProductService,
		private readonly translation: TranslationService )
	{}

	@Delete( ':code' )
	async deleteProduct(
		@Param( 'code' ) code: string
	): Promise<HttpResult> {
		try {

			const codeResult = wrapType<ValidString, InvalidStringException>(
				() => ValidString.from( code ) )

			if ( codeResult instanceof InvalidStringException ) {
				throw codeResult
			}

			const product = await this.deleteProductService.deleteProduct(
				codeResult as ValidString )
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
