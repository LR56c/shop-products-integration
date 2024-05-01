import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { HttpResult } from '../../shared/utils/HttpResult'
import { CreateProductService } from './create-product.service';
import { TranslationService } from 'src/shared/services/translation/translation.service';
import {
  ApiBody,
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
              id           : {
                type   : 'string',
                example: '5bddb4cd-effb-4b49-a295-a8ad7dea82f1'
              },
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
              category: {
                type   : 'string',
                example: 'TEST'
              }
            }
          }
        }
      }
    } )
    async createProduct(
    @Body('product') props: {
      id: string;
      code: string;
      name: string;
      description: string;
      brand: string;
      image_url: string;
      rank: string;
      price: number;
      stock: number;
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
