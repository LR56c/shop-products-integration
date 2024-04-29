import {Body, Controller, HttpStatus, Post} from '@nestjs/common';
import { CreateUserService } from './create_user.service';
import {TranslationService} from "../../shared/services/translation/translation.service";
import {ApiBody, ApiTags} from "@nestjs/swagger";
import {HttpResult} from "../../shared/utils/HttpResult";

@ApiTags('users')
@Controller('users')
export class CreateUserController {
  constructor(private readonly createUserService: CreateUserService,
              private readonly translation: TranslationService) {
  }

  @Post()
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
              example: ''
            }
          }
        }
      }
    }
  })
  async createUser(
      @Body('user') props: {
        rut: string;
        name: string;
        email: string;
        role: string;
      }
  ): Promise<HttpResult> {
    try {
      await this.createUserService.createUser(props);
      return {
        statusCode: HttpStatus.OK
      }
    } catch (e) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: this.translation.translateAll(e)
      }
    }
  }
}
