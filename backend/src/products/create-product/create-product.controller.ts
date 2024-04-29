import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { HttpResult } from '../../shared/utils/HttpResult'
import { CreateProductService } from './create-product.service';
import { TranslationService } from 'src/shared/services/translation/translation.service';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger'

@ApiTags('products')
@Controller('products')
export class CreateProductController {
  constructor(private readonly createProductService: CreateProductService,
    private readonly translation: TranslationService) {}

    @Post()
    @ApiBody( {
      schema: {
        type      : 'object',
        properties: {
          product: {
            type      : 'object',
            properties: {
              code         : {
                type   : 'string',
                example: 'abc'
              },
              product_code         : {
                type   : 'string',
                example: 'abc2'
              },
              name         : {
                type   : 'string',
                example: 'n'
              },
              description  : {
                type   : 'string',
                example: 'd'
              },
              brand        : {
                type   : 'string',
                example: 'b'
              },
              price        : {
                type   : 'number',
                example: 2
              },
              image_url    : {
                type   : 'string',
                example: 'http://img'
              },
              stock        : {
                type   : 'number',
                example: 2
              },
              rank         : {
                type   : 'number',
                example: 2
              },
              category_name: {
                type   : 'string',
                example: 'TEST'
              }
            }
          }
        }
      }
    } )
    @ApiOperation({
      summary: 'Create a product',
    })
    @ApiResponse({
      status: 200,
      description: 'CODE: 200. The product has been successfully created.'
    })
    @ApiResponse({
      status: 400,
      description: 'CODE: 400 with translation. The product could not be created.',
    })
    async createProduct(
    @Body('product') props: {
      code: string;
      product_code: string;
      name: string;
      description: string;
      brand: string;
      image_url: string;
      rank: string;
      price: string;
      stock: string;
      category_name: string;
    }
  ): Promise<HttpResult> {
    try {
      await this.createProductService.createProduct(props);
      return {
        statusCode: HttpStatus.OK,
      };
    } catch (e) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: this.translation.translateAll(e),
      };
    }
  }
}
