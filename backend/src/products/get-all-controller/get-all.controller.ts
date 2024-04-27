import {
	Body,
	Controller,
	Get,
	HttpStatus,
	Query
} from '@nestjs/common'
import {
	ApiBody,
	ApiTags
} from '@nestjs/swagger'
import { GetAllService } from 'src/products/get-all-controller/get-all.service'
import { TranslationService } from 'src/shared/services/translation/translation.service'
import { InvalidStringException } from '~features/shared/domain/exceptions/InvalidStringException'
import { PasswordInsufficientCharacterException } from '~features/user/domain/exceptions/PasswordException'
import { Product } from '../domain/models/Product'
import { HttpResultData } from 'src/shared/utils/HttpResultData'

@ApiTags( 'products' )
@Controller( 'products' )
export class GetAllController {
	constructor(
		private readonly getAllControllerService: GetAllService,
		private readonly translation: TranslationService
	)
	{}

	@Get()
	// @ApiBody( {
	// 	schema: {
	// 		type      : 'object',
	// 		properties: {
	// 			from           : {
	// 				type   : 'number',
	// 				example: '2'
	// 			},
	// 			to           : {
	// 				type   : 'number',
	// 				example: '2'
	// 			},
	// 		}
	// 	}
	// } )
	async getAll(
		@Query( 'from' ) from: string,
		@Query( 'to' ) to: string
	): Promise<HttpResultData<Product[]>> {
		try {
			const products = await this.getAllControllerService.getAll( from, to )
			return {
				data: products,
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
