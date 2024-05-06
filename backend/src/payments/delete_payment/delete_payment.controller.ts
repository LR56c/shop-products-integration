import {Controller, Delete, HttpStatus, Param} from '@nestjs/common';
import { DeletePaymentService } from './delete_payment.service';
import {TranslationService} from "../../shared/services/translation/translation.service";
import {
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger'
import {wrapType} from "~features/shared/utils/WrapType";
import {UUID} from "~features/shared/domain/value_objects/UUID";
import {BaseException} from "~features/shared/domain/exceptions/BaseException";
import {HttpResult} from "../../shared/utils/HttpResult";

@ApiTags('payments')
@Controller('payments')
export class DeletePaymentController {
  constructor(private readonly deletePaymentService: DeletePaymentService,
              private readonly translation: TranslationService) {}
  @Delete(':id')
  @ApiOperation( {
    summary: 'Delete a payment',
    description: 'Delete a payment by id',
  } )
  @ApiResponse( {
    status     : 200,
    content: {
      'application/json': {
        schema: {
          type: 'object',
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
    status     : 400,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            statusCode: {
              type   : 'number',
              example: 400
            },
            message: {
              type      : 'object',
              properties: {
                code_error   : {
                  type   : 'string',
                  example: 'error translation'
                },
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
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            statusCode: {
              type   : 'number',
              example: 500
            },
          }
        }
      }
    }
  } )
  async deletePayment(
      @Param('id') id: string,
  ): Promise<HttpResult> {
    try {
      const idResult = wrapType<UUID,BaseException>(
            () => UUID.from(id))
      if (idResult instanceof BaseException) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: this.translation.translateAll([idResult])
        }
      }
      await this.deletePaymentService.deletePayment(idResult);
      return {
        statusCode: HttpStatus.OK
      }
    } catch (e) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR
      }
    }
  }
}

