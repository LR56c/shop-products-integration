import {Body, Controller, HttpStatus, Param, Put} from '@nestjs/common';
import { UpdateUserService } from './update_user.service';
import {ApiBody, ApiTags} from "@nestjs/swagger";
import {TranslationService} from "../../shared/services/translation/translation.service";
import {HttpResult} from "../../shared/utils/HttpResult";
import {BaseException} from "~features/shared/domain/exceptions/BaseException";
import {userFromJson} from "~features/user/application/user_mapper";
import {User} from "~features/user/domain/models/User";

@ApiTags('users')
@Controller('users')
export class UpdateUserController {
  constructor(private readonly updateUserService: UpdateUserService,
              private readonly translation: TranslationService) {}

  @Put(':email')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        user: {
          type: 'object',
          properties: {
            rut: {
              type: 'string',
              example: '123456789'
            },
            name: {
              type: 'string',
              example: 'John Doe'
            },
            email: {
              type: 'string',
              example: 'abc@gmail.com'
            },
            role: {
              type: 'string',
              example: 'role'
            }
          }
        }
      }
    }
  })
  async updateUser(
      @Param('email') email: string,
      @Body('user') body: any
  ): Promise<HttpResult> {
    try {
      const u = userFromJson( body )

      if ( !( u instanceof User ) ) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message   : this.translation.translateAll( u as BaseException[] )
        }
      }

      await this.updateUserService.updateUser( email, u as User )

      return {
        statusCode: HttpStatus.OK
      }
    }
    catch ( e ) {
      return {
        statusCode: HttpStatus.BAD_REQUEST
      }
    }
  }
}
