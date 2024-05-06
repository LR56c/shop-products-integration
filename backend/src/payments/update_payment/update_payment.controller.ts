import {Body, Controller, HttpStatus, Param, Put} from '@nestjs/common';
import { UpdatePaymentService } from './update_payment.service';
import {ApiBody, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {HttpResult} from "../../shared/utils/HttpResult";
import {paymentFromJson} from "~features/payments/application/payment_mapper";
import {Payment} from "~features/payments/domain/models/payment";
import {TranslationService} from "../../shared/services/translation/translation.service";
import {parsePayment} from "../shared/parsePayment";
import {UpdatePaymentDto} from "./update_payment_dto";

@ApiTags('payments')
@Controller('payments')
export class UpdatePaymentController {
  constructor(private readonly updatePaymentService: UpdatePaymentService,
              private readonly translation: TranslationService ) {}

  @Put()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        payment: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: '668476f7-b08f-40b6-9e02-faa55aca42b1'
            },
            created_at: {
              type: 'date',
              example: '2021-09-21'
            },
            approved: {
              type: 'boolean',
              example: true
            },
            delivery_address: {
              type: 'string',
              example: 'John Doe'
            },
            value: {
              type: 'integer',
              example: 1000
            },
            payment_method: {
              type: 'string',
              example: 'CREDIT'
            }
          }
        }
      }
    }
  })
  @ApiOperation( {
    summary: 'Payment Updated',
    description: 'Update a payment by  json data',
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
  async updatePayment(
      @Body('payment') dto: UpdatePaymentDto
): Promise<HttpResult> {
    try {
      const result = parsePayment(dto)

      await this.updatePaymentService.updatePayment(result as Payment)
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