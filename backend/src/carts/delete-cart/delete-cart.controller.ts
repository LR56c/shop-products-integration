import {
  Body,
  Controller,
  Delete,
  HttpStatus
} from '@nestjs/common'
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger'
import { BaseException } from '~features/shared/domain/exceptions/BaseException'
import { EmailException } from '~features/shared/domain/exceptions/EmailException'
import { InvalidIntegerException } from '~features/shared/domain/exceptions/InvalidIntegerException'
import { Email } from '~features/shared/domain/value_objects/Email'
import { UUID } from '~features/shared/domain/value_objects/UUID'
import { wrapType } from '~features/shared/utils/WrapType'
import { TranslationService } from '../../shared/services/translation/translation.service'
import { HttpResult } from '../../shared/utils/HttpResult'
import { DeleteCartService } from './delete-cart.service'

@ApiTags( 'carts' )
@Controller( 'carts' )
export class DeleteCartController {
  constructor(private readonly deleteCartService: DeleteCartService,
    private readonly translation: TranslationService) {}

  @Delete()
  @ApiBody( {
    schema: {
      type      : 'object',
      properties: {
        user_email: {
          type   : 'string',
          example: 'aaaa@gmail.com'
        },
        product_id: {
          type   : 'string',
          example: '359b6378-f875-4d31-b415-d3de60a59875'
        },
      }
    }
  } )
  @ApiOperation( {
    summary    : 'Delete cart',
    description: 'Delete cart by user_email and product_id'
  } )
  @ApiResponse( {
    status : 200,
    content: {
      'application/json': {
        schema: {
          type      : 'object',
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
  async deleteCart(
    @Body('user_email') user_email : string,
    @Body('product_id') product_id: string
  ): Promise<HttpResult> {
    try {

      const { data } = this.parseDeleteCart( { user_email, product_id } )

      await this.deleteCartService.deleteCart( data.user_email, data.product_id )

      return {
        statusCode: HttpStatus.OK
      }
    }
    catch ( e ) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message   : this.translation.translateAll( e )
      }
    }
  }

  parseDeleteCart( dto: {
    user_email: string,
    product_id: string,
  } ): {
    data: {
      user_email: Email
      product_id: UUID
    }
  }
  {
    const errors: BaseException[] = []

    const user_email = wrapType<Email, EmailException>(
        () => Email.from( dto.user_email ) )

    if ( user_email instanceof EmailException ) {
      errors.push( new EmailException() )
    }

    const product_id = wrapType<UUID, InvalidIntegerException>(
        () => UUID.from( dto.product_id ) )

    if ( product_id instanceof InvalidIntegerException ) {
      errors.push( new InvalidIntegerException() )
    }

    if ( errors.length > 0 ) {
      throw errors
    }

    return {
      data: {
        user_email: user_email as Email,
        product_id: product_id as UUID
      }
    }
  }

}
