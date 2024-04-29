import {Controller, Get, HttpStatus, Query} from '@nestjs/common';
import { GetUserService } from './get_user.service';
import {ApiTags} from "@nestjs/swagger";
import {TranslationService} from "../../shared/services/translation/translation.service";
import {HttpResultData} from "../../shared/utils/HttpResultData";
import {userToJson} from "~features/user/application/user_mapper";

@ApiTags('users')
@Controller('users')
export class GetUserController {
  constructor(private readonly getUserService: GetUserService,
              private readonly translation: TranslationService) {}
  @Get()
  async getUser(
      @Query('role') role: string,
      @Query('name') name: string,
      @Query('from') from: string,
      @Query('to') to: string
  ): Promise<HttpResultData<Record<string,any>[]>> {
    try {
      const users = await this.getUserService.getUser(role, name, from, to)
      let json: Record<string, any>[] = []
      for (const user of users) {
        json.push(userToJson(user))
      }
      return {
        data: json,
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
