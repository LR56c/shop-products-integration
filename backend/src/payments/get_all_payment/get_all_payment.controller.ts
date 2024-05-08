import {Controller, Get, HttpStatus, Query} from '@nestjs/common';
import { GetAllPaymentService } from './get_all_payment.service';
import {TranslationService} from "../../shared/services/translation/translation.service";
import {ApiOperation, ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";
import {HttpResultData} from "../../shared/utils/HttpResultData";
import {ValidDate} from "~features/shared/domain/value_objects/ValidDate";
import {ValidBool} from "~features/shared/domain/value_objects/ValidBool";
import {ValidInteger} from "~features/shared/domain/value_objects/ValidInteger";
import {BaseException} from "~features/shared/domain/exceptions/BaseException";
import {wrapType} from "~features/shared/utils/WrapType";
import {InvalidIntegerException} from "~features/shared/domain/exceptions/InvalidIntegerException";
import {InvalidBooleanException} from "~features/shared/domain/exceptions/InvalidBooleanException";
import {InvalidDateException} from "~features/shared/domain/exceptions/InvalidDateException";
import {paymentToJson} from "~features/payments/application/payment_mapper";

@ApiTags( 'payments' )
@Controller( 'payments' )
export class GetAllPaymentController {
  constructor(private readonly getAllPaymentService: GetAllPaymentService,
              private readonly translation: TranslationService) {}
  @Get()
  @ApiQuery( {
    name    : 'approved',
    type    : Boolean,
    required: true
  } )
  @ApiOperation({
    summary: 'Get all payments',
    description: 'Get all payments from a range of payments, and optionally filter by approved'
  })
  @ApiResponse({
    status : 200,
    content: {
      'application/json': {
        schema: {
          type      : 'object',
          properties: {
            statusCode: {
              type   : 'number',
              example: 200
            },
            data      : {
              type : 'array',
              items: {
                type      : 'object',
                properties: {
                  id          : {
                    type   : 'string',
                    example: '123e4567-e89b-12d3-a456-426614174000'
                  },
                  creationDate: {
                    type   : 'string',
                    example: '2021-08-06T14:40:00.000Z'
                  },
                  approved    : {
                    type   : 'boolean',
                    example: true
                  },
                  deliveryName: {
                    type   : 'string',
                    example: 'John Doe'
                  },
                  paymentValue: {
                    type   : 'number',
                    example: 100
                  },
                  paymentMethod: {
                    type   : 'string',
                    example: 'credit card'
                  }
                }
              }
            }
          }
        }
      }
    }
  })
  @ApiResponse( {
    status : 400,
    content: {
      'application/json': {
        schema: {
          type      : 'object',
          properties: {
            statusCode: {
              type   : 'number',
              example: 400
            },
            message   : {
              type      : 'object',
              properties: {
                code_error: {
                  type   : 'string',
                  example: 'error translation'
                }
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
    content    : {
      'application/json': {
        schema: {
          type      : 'object',
          properties: {
            statusCode: {
              type   : 'number',
              example: 500
            }
          }
        }
      }
    }
  } )
  async getAll(
      @Query( 'from' ) from: number,
      @Query( 'to' ) to: number,
      @Query( 'approved' ) approved?: boolean,
      @Query( 'from_date' ) from_date?: string,
      @Query( 'to_date' ) to_date?: string
  ): Promise<HttpResultData<Record<string, any>[]>> {
    try{
      const {data, errors} = this.parseGetAllPayment({
        from,
        to,
        approved,
        from_date,
        to_date
      })
      if (errors.length > 0) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message  :  this.translation.translateAll(errors)
        }
      }
      const payments = await this.getAllPaymentService.getAll(
          data.from,
          data.to,
          data.approved,
          data.from_date,
          data.to_date
      )
      let json: Record<string, any>[] = []
      for (const payment of payments) {
        json.push(paymentToJson(payment))
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

  parseGetAllPayment(dto: {
    from: number,
    to: number,
    approved?: boolean,
    from_date?: string,
    to_date?: string,
  }): {
    errors: BaseException[],
    data:{
      from: ValidInteger
      to: ValidInteger
      approved?: ValidBool
      from_date?: ValidDate
      to_date?: ValidDate
    }
  }
  {
    const errors: BaseException[] = []

    const from = wrapType<ValidInteger, InvalidIntegerException>(
        () => ValidInteger.from(dto.from),
    )
    if (from instanceof BaseException) {
      errors.push(new InvalidIntegerException('from'))
    }
    const to = wrapType<ValidInteger, InvalidIntegerException>(
        () => ValidInteger.from(dto.to),
    )
    if (to instanceof BaseException) {
      errors.push(new InvalidIntegerException('to'))
    }
    const approved = dto.approved === undefined ?
        undefined : wrapType<ValidBool, InvalidBooleanException>(
        () => ValidBool.from(dto.approved ?? false))

    const from_date = dto.from_date === undefined ?
        undefined : wrapType<ValidDate, InvalidDateException>(
            () => ValidDate.from(dto.from_date ?? ''))

    const to_date = dto.to_date === undefined ?
        undefined : wrapType<ValidDate, InvalidDateException>(
            () => ValidDate.from(dto.to_date ?? ''))

    return {
      data: {
        from: from as ValidInteger,
        to: to as ValidInteger,
        approved: approved as ValidBool,
        from_date: from_date as ValidDate,
        to_date: to_date as ValidDate
      },
      errors
    }
  }
}


