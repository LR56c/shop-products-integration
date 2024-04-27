import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { CreateProductService } from './create-product.service';
import { TranslationService } from 'src/shared/services/translation/translation.service';
import { HttpResultData } from 'src/shared/utils/HttpResultData';
import { Product } from 'features/products/domain/models/Product';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class CreateProductController {
  constructor(private readonly createProductService: CreateProductService,
    private readonly translation: TranslationService) {}

    @Post()
    async createProduct(
    @Body('product') props: {
      id: string;
      code: string;
      name: string;
      description: string;
      create_at: string;
      brand: string;
      image_url: string;
      rank: string;
      price: string;
      stock: string;
      category_name: string;
    }
  ): Promise<HttpResultData<Product>> {
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
