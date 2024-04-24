import { Body, Controller, Delete, HttpStatus } from '@nestjs/common';
import { DeleteProductService } from './delete-product.service';
import { ValidString } from '~features/shared/domain/value_objects/ValidString';
import { InvalidStringException } from '~features/shared/domain/exceptions/InvalidStringException';
import { FlatErrors, flatErrors } from '~features/shared/utils/FlatErrors';
import { wrapType } from '~features/shared/utils/WrapType';


@Controller('products')
export class DeleteProductController {
  constructor(private readonly deleteProductService: DeleteProductService) {}
  @Delete()
  async deleteProduct(
    @Body('code') code: string,
  ) {
    try {
      const { code: codeResult, errors } = this.parseGetAllParams(
        code,
      )
      if (errors && errors.length > 0) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: flatErrors(errors),
        }
      }

      const product = await this.deleteProductService.deleteProduct(
        codeResult as ValidString,
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

  parseGetAllParams(code: string): {
    code?: ValidString;
    errors?: FlatErrors[];
  } {
    let errors: Error[] = [];

    const codeResult = wrapType<ValidString, InvalidStringException>(() =>
      ValidString.from(code),
    );

    if (codeResult instanceof Error) {
      errors.push(codeResult);
    }

    if (errors.length > 0) {
      return {
        errors: flatErrors(errors),
      };
    }

    return {
      code: codeResult as ValidString
    };
  }
}
