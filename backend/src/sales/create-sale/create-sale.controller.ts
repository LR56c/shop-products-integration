import {
  Body,
  Controller,
  HttpStatus,
  Post
} from '@nestjs/common'
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger'
import { parseSale } from 'src/sales/shared/parse_sale'
import { TranslationService } from 'src/shared/services/translation/translation.service'
import { HttpResult } from 'src/shared/utils/HttpResult'
import { SaleDto } from '../shared/sale_dto'
import { CreateSaleService } from './create-sale.service'

@ApiTags( 'sales' )
@Controller( 'sales' )
export class CreateSaleController {
  constructor(private readonly createSaleService: CreateSaleService,
  private readonly translation: TranslationService
  ) {}

  @Post()
  @ApiBody( {
      schema: {
        type      : 'object',
        properties: {
          id         : {
            type   : 'string',
            example: '3643fe52-f496-4d1f-87b9-d81d71ddf62d'
          },
          product_id       : {
            type   : 'string',
            example: 'b8d274ae-2bde-4b51-991d-c4bb108170a8'
          },
          percentage : {
            type   : 'number',
            example: 20
          },
          created_at : {
            type   : 'string',
            example: '2024-04-27'
          },
          end_date   : {
            type   : 'string',
            example: '2024-04-27'
          },
          start_date : {
            type   : 'string',
            example: '2024-04-27'
          }
        }
      }
    }
  )
  @ApiOperation( {
    summary    : 'Create a sale',
    description: 'Create a sale with json data'
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
  async handle(
    @Body(  ) saleDto: SaleDto,
  ): Promise<HttpResult> {
    try {
      const sale = parseSale( saleDto )

      await this.createSaleService.createSale( sale)

      return {
        statusCode: HttpStatus.OK
      }
    }
    catch ( e ) {
      console.log('sale e')
      console.log(e)
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message   : this.translation.translateAll( e )
      }
    }
  }
}
