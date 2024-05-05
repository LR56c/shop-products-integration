import {Body, Controller, HttpStatus, Param, Put} from '@nestjs/common';
import { UpdatePaymentService } from './update_payment.service';
import {ApiBody, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {PaymentDto} from "../shared/payment_dto";
import {HttpResult} from "../../shared/utils/HttpResult";
import {UUID} from "~features/shared/domain/value_objects/UUID";
import {wrapType} from "~features/shared/utils/WrapType";
import {InvalidUUIDException} from "~features/shared/domain/exceptions/InvalidUUIDException";
import {paymentFromJson} from "~features/payments/application/payment_mapper";
import {Payment} from "~features/payments/domain/models/payment";
import {TranslationService} from "../../shared/services/translation/translation.service";
import {BaseException} from "~features/shared/domain/exceptions/BaseException";

@ApiTags('payments')
@Controller('payments')
export class UpdatePaymentController {
  constructor(private readonly updatePaymentService: UpdatePaymentService,
              private readonly translation: TranslationService ) {}

  @Put(':id')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        payment: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: 'AAAA-AAAA-AAAA'
            },
            creationDate: {
              type: 'date',
              example: '2021-09-21'
            },
            approved: {
              type: 'boolean',
              example: true
            },
            deliveryName: {
              type: 'string',
              example: 'John Doe'
            },
            paymentValue: {
              type: 'integer',
              example: 1000
            },
            paymentMethod: {
              type: 'string',
              example: 'Credit'
            }
          }
        }
      }
    }
  })
  @ApiOperation( {
    summary: 'Payment Updated',
    description: 'Update a payment by id and json data',
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
      @Body('payment') dto: PaymentDto
  ): Promise<HttpResult> {
    try {
      const {errors, data} = dto
      if (errors.length > 0) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: this.translation.translateAll(errors)
        }
      }
    }
  }
}
