import {
	Controller,
	Get,
	HttpStatus,
	Query
} from '@nestjs/common'
import { TranslationService } from 'src/shared/services/translation/translation.service'
import { GetUserDto } from 'src/users/get_user/get_user_dto'
import { BaseException } from '~features/shared/domain/exceptions/BaseException'
import { InvalidIntegerException } from '~features/shared/domain/exceptions/InvalidIntegerException'
import { InvalidRoleException } from '~features/shared/domain/exceptions/InvalidRoleException'
import { InvalidStringException } from '~features/shared/domain/exceptions/InvalidStringException'
import { Role } from '~features/shared/domain/value_objects/Role'
import { ValidInteger } from '~features/shared/domain/value_objects/ValidInteger'
import { ValidString } from '~features/shared/domain/value_objects/ValidString'
import { wrapType } from '~features/shared/utils/WrapType'
import { GetUserService } from './get_user.service'
import { ApiTags } from '@nestjs/swagger'
import { HttpResultData } from '../../shared/utils/HttpResultData'
import { userToJson } from '~features/user/application/user_mapper'


@ApiTags( 'users' )
@Controller( 'users' )
export class GetUserController {
	constructor( private readonly getUserService: GetUserService, private readonly  translationService : TranslationService) {}

	@Get()
	async getUser(
		@Query() dto: GetUserDto
	): Promise<HttpResultData<Record<string, any>[]>> {
		try {

			const { errors, data } = this.parseGetUser( dto )

			if ( errors.length > 0 ) {
				return {
					statusCode: HttpStatus.BAD_REQUEST,
					message: this.translationService.translateAll( errors)
				}
			}

			const users = await this.getUserService.getUser( data.role, data.name,
				data.from, data.to )

			let json: Record<string, any>[] = []
			for ( const user of users ) {
				json.push( userToJson( user ) )
			}
			return {
				data      : json,
				statusCode: HttpStatus.OK
			}
		}
		catch ( e ) {
			return {
				statusCode: HttpStatus.INTERNAL_SERVER_ERROR
			}
		}
	}

	parseGetUser( dto: GetUserDto ): {
		errors: BaseException[],
		data: {
			role: Role
			from: ValidInteger
			to: ValidInteger
			name: ValidString
		}
	}
	{
		const errors: BaseException[] = []
		const role                    = wrapType<Role, InvalidRoleException>(
			() => Role.from( dto.role ) )

		if ( role instanceof BaseException ) {
			errors.push( new InvalidRoleException( 'role' ) )
		}

		const from = wrapType<ValidInteger, InvalidIntegerException>(
			() => ValidInteger.from( dto.from ) )

		if ( from instanceof BaseException ) {
			errors.push( new InvalidIntegerException( 'from' ) )
		}

		const to = wrapType<ValidInteger, InvalidIntegerException>(
			() => ValidInteger.from( dto.to ) )

		if ( from instanceof BaseException ) {
			errors.push( new InvalidIntegerException( 'to' ) )
		}

		const name = wrapType<ValidString, InvalidStringException>(
			() => ValidString.from( dto.name ) )

		if ( name instanceof BaseException ) {
			errors.push( new InvalidStringException( 'name' ) )
		}

		return {
			data: {
				role: role as Role,
				from: from as ValidInteger,
				to  : to as ValidInteger,
				name: name as ValidString
			},
			errors
		}
	}

}
