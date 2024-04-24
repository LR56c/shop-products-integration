import { Body, Controller, Get, HttpStatus } from '@nestjs/common';
import { Translation } from 'src/shared/infrastructure/parseTranslation'
import { GetRecommendProductService } from './get-recommend-product.service';
import { ValidInteger } from '~features/shared/domain/value_objects/ValidInteger';
import { InvalidIntegerException } from '~features/shared/domain/exceptions/InvalidIntegerException';
import { ValidRank } from 'features/products/domain/models/ValidRank';
import { InvalidRankException } from 'features/products/domain/exceptions/InvalidRankException';
import { wrapType } from '~features/shared/utils/WrapType';
import { FlatErrors, flatErrors } from '~features/shared/utils/FlatErrors';
import { Product } from 'features/products/domain/models/product';

@Controller('get-recommend-product')
export class GetRecommendProductController {
  constructor(private readonly getRecommendProductService: GetRecommendProductService) {}
  @Get()
  async getRecommendProducts(
    @Body('threshold')
    threshold: number,
    @Body('Product')
    productos: Product[],
    @Body('from')
    from: number,
    @Body('to')
    to: number
  ) {
    try {
      const {threshold : thresholdResult, from : fromResult, to : toResult, errors } = this.parseGetAllParams(threshold, from, to);
      if (errors && errors.size > 0) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: errors,
        };
      }
      const products = await this.getRecommendProductService.getRecommendProducts( thresholdResult as ValidRank, productos as Product[], fromResult as ValidInteger, toResult as ValidInteger );
      return {
        data: products,
        statusCode: HttpStatus.OK,
      };
    } catch (e) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }
  parseGetAllParams( threshold : number, from : number, to : number): {
    threshold?: ValidRank,
    from?: ValidInteger,
    to?: ValidInteger,
    errors?: Map<string, Translation>
  }
  {
    let errors: Error[] = []

    const thresholdResult = wrapType<ValidRank, InvalidRankException>(
      () => ValidRank.from( threshold ) )

    if ( thresholdResult instanceof Error ) {
      errors.push( thresholdResult )
    }

    const fromResult = wrapType<ValidInteger, InvalidIntegerException>(
      () => ValidInteger.from( from ) )

    if ( fromResult instanceof Error ) {
      errors.push( fromResult )
    }

    const toResult = wrapType<ValidInteger, InvalidIntegerException>(
      () => ValidInteger.from( to ) )

    if ( toResult instanceof Error ) {
      errors.push( toResult )
    }

    if ( errors.length > 0 ) {
      return {
        errors: flatErrors( errors )
      }
    }
    return {
      threshold: thresholdResult as ValidRank,
      from: fromResult as ValidInteger,
      to: toResult as ValidInteger
    }
  }
}
