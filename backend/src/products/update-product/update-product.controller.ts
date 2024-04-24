import { Body, Controller, HttpStatus, Put } from '@nestjs/common';
import { UpdateProductService } from './update-product.service';
import { ValidString } from '~features/shared/domain/value_objects/ValidString';
import { InvalidStringException } from '~features/shared/domain/exceptions/InvalidStringException';
import { ValidInteger } from '~features/shared/domain/value_objects/ValidInteger';
import { InvalidIntegerException } from '~features/shared/domain/exceptions/InvalidIntegerException';
import { wrapType } from '~features/shared/utils/WrapType';
import { FlatErrors, flatErrors } from '~features/shared/utils/FlatErrors';

@Controller('update-product')
export class UpdateProductController {
  constructor(private readonly updateProductService: UpdateProductService) {}

  @Put()
  async updateProduct(
    @Body('code') code: string,
    @Body('quantity') quantity: number,
  ) {
    try {
      const { code: codeResult, quantity: quantityResult, errors } = this.parseGetAllParams(
        code,
        quantity,
      )
      if (errors && errors.length > 0) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: flatErrors(errors),
        }
      }

      const product = await this.updateProductService.updateProduct(
        codeResult as ValidString,
        quantityResult as ValidInteger,
      )
      return {
        data: product,
        statusCode: HttpStatus.OK,
      }
    } catch (e) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
      }
    }
  }
  parseGetAllParams( code : string, quantity : number): {
    code?: ValidString,
    quantity?: ValidInteger,
    errors?: FlatErrors[]
  }
  {
    let errors: Error[] = []

    const codeResult = wrapType<ValidString, InvalidStringException>(
      () => ValidString.from( code ) )

    if ( codeResult instanceof Error ) {
      errors.push( codeResult )
    }

    const quantityResult = wrapType<ValidInteger, InvalidIntegerException>(
      () => ValidInteger.from( quantity ) )

    if ( quantityResult instanceof Error ) {
      errors.push( quantityResult )
    }

    if ( errors.length > 0 ) {
      return {
        errors: flatErrors( errors )
      }
    }
    return {
      code: codeResult as ValidString,
      quantity: quantityResult as ValidInteger
    }
  }
}

