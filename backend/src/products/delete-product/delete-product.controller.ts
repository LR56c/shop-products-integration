import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Param
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { TranslationService } from '../../shared/services/translation/translation.service'
import { DeleteProductService } from './delete-product.service'


@ApiTags('products')
@Controller('products')
export class DeleteProductController {
  constructor(private readonly deleteProductService: DeleteProductService,
    private readonly translation: TranslationService ) {}
  @Delete(":code")
  async deleteProduct(
    @Param('code') code: string,
  ) {
    try {
      const product = await this.deleteProductService.deleteProduct( code )
      return {
        data: product,
        statusCode: HttpStatus.OK,
      }
    } catch (e) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message   : this.translation.translateAll( e )
      }
    }
  }
}
