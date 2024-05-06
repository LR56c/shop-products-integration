import {Body, Controller, HttpStatus, Post} from '@nestjs/common';
import { CreatePaymentService } from './create_payment.service';
import {ApiBody, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {TranslationService} from "../../shared/services/translation/translation.service";
import {CreatePaymentDto} from "./create_payment_dto";
import {HttpResult} from "../../shared/utils/HttpResult";
import {Payment} from "~features/payments/domain/models/payment";
import {CreatePayment} from "~features/payments/application/creat_payment";

@ApiTags('payments')
@Controller('payments')
export class CreatePaymentController {
  constructor(private readonly createPaymentService: CreatePaymentService,
              private readonly translationService: TranslationService) {}
  @Post()
  @ApiBody( {
    schema: {
      type      : 'object',
      properties: {
        payment: {
          type      : 'object',
          properties: {
            id: {
              type   : 'string',
              example: '668476f7-b08f-40b6-9e02-faa55aca42b1'
            },
            created_at: {
              type   : 'date',
              example: '2021-09-21'
            },
            approved: {
              type   : 'boolean',
              example: true
            },
            delivery_address: {
              type   : 'string',
              example: 'John Doe'
            },
            value: {
              type   : 'integer',
              example: 1000
            },
            payment_method: {
              type   : 'string',
              example: 'CREDIT'
            }
          }
        }
      }
    }
  } )
  @ApiOperation( {
    summary: 'Create a payment',
    description: 'Create a payment by json data. product must exist. id must be unique',
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
  async createPayment(
      @Body('payment') dto: CreatePaymentDto
  ): Promise<HttpResult> {
    try {
      const paymentResult = await CreatePayment({
        id: dto.id,
        creationDate: dto.created_at,
        approved: dto.approved,
        deliveryName: dto.delivery_address,
        paymentValue: dto.value,
        paymentMethod: dto.payment_method
      })
      await this.createPaymentService.createPayment(paymentResult as Payment)
      return {
        statusCode: HttpStatus.OK
      }
    } catch (e) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message   : this.translationService.translateAll(e)
      }
    }
  }

}