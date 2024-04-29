import {Controller, Delete, HttpStatus, Param} from '@nestjs/common';
import { DeleteUserService } from './delete_user.service';
import {ApiTags} from "@nestjs/swagger";
import {TranslationService} from "../../shared/services/translation/translation.service";
import {HttpResult} from "../../shared/utils/HttpResult";

@ApiTags('users')
@Controller('users')
export class DeleteUserController {
  constructor(private readonly deleteUserService: DeleteUserService,
              private readonly translation: TranslationService) {}
  @Delete(":email")
  async deleteUser(
      @Param('email') email: string,
  ): Promise<HttpResult> {
    try {
      const user = this.deleteUserService.deleteUser(email)
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
