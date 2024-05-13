import {
	Controller,
	Delete,
	HttpStatus,
	Param
} from '@nestjs/common'
import {
	ApiOperation,
	ApiResponse,
	ApiTags
} from '@nestjs/swagger'
import { HttpResult } from 'src/shared/utils/HttpResult'
import { DeleteReportService } from './delete-report.service'
import { wrapType } from '~features/shared/utils/WrapType'
import { UUID } from '~features/shared/domain/value_objects/UUID'
import { BaseException } from '~features/shared/domain/exceptions/BaseException'
import { InvalidUUIDException } from '~features/shared/domain/exceptions/InvalidUUIDException'
import { TranslationService } from '../../shared/services/translation/translation.service'

@ApiTags( 'reports' )
@Controller( 'reports' )
export class DeleteReportController {
	constructor( private readonly deleteReportService: DeleteReportService,
		private readonly translation: TranslationService )
	{
	}

	@Delete( ':id' )
	@ApiOperation( {
		summary    : 'Delete report',
		description: 'Delete report by id'
	} )
	@ApiResponse( {
		status : 200,
		content: {
			'application/json': {
				schema: {
					type      : 'object',
					properties: {
						statusCode: {
							type   : 'number',
							example: 200
						}
					}
				}
			}
		}
	} )
	@ApiResponse( {
		status : 400,
		content: {
			'application/json': {
				schema: {
					type      : 'object',
					properties: {
						statusCode: {
							type   : 'number',
							example: 400
						},
						message   : {
							type      : 'object',
							properties: {
								code_error: {
									type   : 'string',
									example: 'error translation'
								}
							}
						}
					}
				}
			}
		}
	} )
	@ApiResponse( {
		status     : 500,
		description: 'Internal server error by external operations',
		content    : {
			'application/json': {
				schema: {
					type      : 'object',
					properties: {
						statusCode: {
							type   : 'number',
							example: 500
						}
					}
				}
			}
		}
	} )
	async deleteReport(
		@Param( 'id' ) id: string
	): Promise<HttpResult> {
		try {

			const idResult = wrapType<UUID, InvalidUUIDException>(
				() => UUID.from( id ) )

			if ( idResult instanceof BaseException ) {
				throw idResult
			}

			await this.deleteReportService.deleteReport( idResult )

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
