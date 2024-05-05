import {Controller, Get, HttpStatus, Param} from '@nestjs/common';
import { GetPaymentService } from './get_payment.service';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {TranslationService} from "../../shared/services/translation/translation.service";
import {HttpResult} from "../../shared/utils/HttpResult";
import {Payment} from "~features/payments/domain/models/payment";
import {wrapType} from "~features/shared/utils/WrapType";
import {UUID} from "~features/shared/domain/value_objects/UUID";
import {InvalidUUIDException} from "~features/shared/domain/exceptions/InvalidUUIDException";
import {HttpResultData} from "../../shared/utils/HttpResultData";
import {paymentToJson} from "~features/payments/application/payment_mapper";

@ApiTags('payments')
@Controller('payments')
export class GetPaymentController {
  constructor(private readonly getPaymentService: GetPaymentService,
              private readonly translation: TranslationService) {}
  @Get(':id')
  @ApiOperation( {
    summary: 'Get a payment',
    description: 'Get a payment by id',
  } )
  @ApiResponse( {
    status     : 200,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            id: {
              type   : 'string',
              example: 'AAAA-AAAA-AAAA'
            },
            creationDate: {
              type   : 'date',
              example: '2021-09-21'
            },
            approved: {
              type   : 'boolean',
              example: true
            },
            deliveryName: {
              type   : 'string',
              example: 'John Doe'
            },
            paymentValue: {
              type   : 'integer',
              example: 1000
            },
            paymentMethod: {
              type   : 'string',
              example: 'Credit'
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
  async getPayment(@Param('id') id: string): Promise<HttpResultData<Record<string, any>>> {
    try {
      const paymentIdResult = wrapType<UUID, InvalidUUIDException>(
          () => UUID.from(id))
      if (paymentIdResult instanceof InvalidUUIDException) {
        throw [new InvalidUUIDException('id')]
      }
      const payment = await this.getPaymentService.getPayment(paymentIdResult as UUID)
      return {
        data: paymentToJson(payment),
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
