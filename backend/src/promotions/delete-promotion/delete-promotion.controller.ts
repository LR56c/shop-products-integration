import {
  Controller,
  Delete,
  HttpStatus,
  Param
} from '@nestjs/common'
import {
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger'
import { TranslationService } from 'src/shared/services/translation/translation.service'
import { HttpResult } from 'src/shared/utils/HttpResult'
import { BaseException } from '~features/shared/domain/exceptions/BaseException'
import { InvalidUUIDException } from '~features/shared/domain/exceptions/InvalidUUIDException'
import { UUID } from '~features/shared/domain/value_objects/UUID'
import { wrapType } from '~features/shared/utils/WrapType'
import { DeletePromotionService } from './delete-promotion.service';

@ApiTags( 'promotions' )
@Controller( 'promotions' )
export class DeletePromotionController {
  constructor(private readonly deletePromotionService: DeletePromotionService,
    private readonly translation: TranslationService
    ) {}

  @Delete( ':id' )
  @ApiOperation( {
    summary    : 'Delete promotion',
    description: 'Delete promotion by id'
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
  async delete(
    @Param( 'id' ) id: string
  ): Promise<HttpResult> {
    try {

      const idResult = wrapType<UUID, InvalidUUIDException>(
        () => UUID.from( id ) )

      if ( idResult instanceof BaseException ) {
        throw [ new InvalidUUIDException( 'id' ) ]
      }

      await this.deletePromotionService.execute( idResult)
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
