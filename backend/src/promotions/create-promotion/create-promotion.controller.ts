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
import { PromotionDto } from 'src/promotions/shared/promotion_dto'
import { TranslationService } from 'src/shared/services/translation/translation.service'
import { HttpResult } from 'src/shared/utils/HttpResult'
import { promotionFromJson } from '~features/promotions/application/promotion_mapper'
import { Promotion } from '~features/promotions/domain/promotion'
import { CreatePromotionService } from './create-promotion.service'

@ApiTags( 'promotions' )
@Controller( 'promotions' )
export class CreatePromotionController {
  constructor(private readonly createPromotionService: CreatePromotionService,
    private readonly translation: TranslationService
    ) {}

  @Post()
  @ApiBody( {
    schema: {
      type      : 'object',
      properties: {
        id               : {
          type   : 'string',
          example: '3643fe52-f496-4d1f-87b9-d81d71ddf62d'
        },
        order_id         : {
          type   : 'string',
          example: 'cb183faa-40f7-4023-8131-719232e34cf8'
        },
        creation_date    : {
          type   : 'string',
          example: '2024-04-27'
        },
        shop_keeper_email: {
          type   : 'string',
          example: 'ac@gmail.com'
        }
      }
    }
  } )
  @ApiOperation( {
    summary    : 'Create a promotion',
    description: 'Create a promotion with json data'
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
    @Body() dto: PromotionDto
  ): Promise<HttpResult> {
    try {

      const p = promotionFromJson( dto )

      await this.createPromotionService.execute( p as Promotion)

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
}
