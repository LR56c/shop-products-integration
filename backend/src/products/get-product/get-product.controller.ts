import { Body, Controller, Get, HttpStatus } from '@nestjs/common';
import { GetProductService } from './get-product.service';
import { Product } from 'features/products/domain/models/product';
import { HttpResultData } from '~features/shared/utils/HttpResultData';
import { ValidString } from '~features/shared/domain/value_objects/ValidString';
import {
  parseTranslation,
  Translation
} from 'src/shared/infrastructure/parseTranslation'
import { FlatErrors, flatErrors } from '~features/shared/utils/FlatErrors';
import { InvalidStringException } from '~features/shared/domain/exceptions/InvalidStringException';
import { wrapType } from '~features/shared/utils/WrapType';

@Controller('get-product')
export class GetProductController {
  constructor(private readonly getProductService: GetProductService) {}


  @Get()
    async getProduct(
      @Body('code') code: string,
    ) : Promise<HttpResultData<Product>> {
      try {
        const {code : productResult, errors } = this.parseGetAllParams(code);
        if (errors && errors.size > 0) {
          return {
            statusCode: HttpStatus.BAD_REQUEST,
            message: parseTranslation( errors ),
          };
        }

        const product = await this.getProductService.getProduct(
productResult as ValidString,
        );
        return {
          data: product,
          statusCode: HttpStatus.OK,
        };
      } catch (e) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
        };
      }
    }
    parseGetAllParams( code : string): {
      code?: ValidString,
      errors?: Map<string, Translation>
    }
    {
      let errors: Error[] = []

      const limitResult = wrapType<ValidString, InvalidStringException>(
        () => ValidString.from( code ) )

      if ( limitResult instanceof Error ) {
        errors.push( limitResult )
      }

      if ( errors.length > 0 ) {
        return {
          errors: flatErrors( errors )
        }
      }

      return {
        code: limitResult as ValidString
      }
    }
}
