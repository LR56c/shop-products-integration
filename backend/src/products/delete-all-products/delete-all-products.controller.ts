import {
	Controller,
	Delete,
	HttpStatus
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { TranslationService } from 'src/shared/services/translation/translation.service'
import { HttpResult } from 'src/shared/utils/HttpResult'
import { DeleteAllProductsService } from './delete-all-products.service'

@ApiTags( 'products' )
@Controller( 'products' )
export class DeleteAllProductsController {
	constructor( private readonly deleteAllProductsService: DeleteAllProductsService,
		private readonly translation: TranslationService )
	{}


	@Delete( 'all' )
	async deleteAll(): Promise<HttpResult> {
		try {
			await this.deleteAllProductsService.deleteAll()

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
