import { Body, Controller, Get, HttpStatus } from '@nestjs/common';
import { GetAllControllerService } from './get-all-controller.service';
import { HttpResultData } from '~features/shared/utils/HttpResultData';
import { Product } from '../domain/models/Product';
import { ValidInteger } from '~features/shared/domain/value_objects/ValidInteger';
import { FlatErrors, flatErrors } from '~features/shared/utils/FlatErrors';
import { parseTranslation } from 'src/shared/infrastructure/parseTranslation';
import { InvalidIntegerException } from '~features/shared/domain/exceptions/InvalidIntegerException';
import { wrapType } from '~features/shared/utils/WrapType';

@Controller('products')
export class GetAllControllerController {
  constructor(
    private readonly getAllControllerService: GetAllControllerService,
  ) {}

  @Get()
  async getAll(
    @Body('limit') limit: number,
  ): Promise<HttpResultData<Product[]>> {
    try {
      const { limit: limitResult, errors } = this.parseGetAllParams(limit);
      if (errors && errors.length > 0) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: parseTranslation( errors ),
        };
      }

      const products = await this.getAllControllerService.getAll(
        limitResult as ValidInteger,
      );
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
  parseGetAllParams( limit : number ): {
		limit?: ValidInteger,
		errors?: FlatErrors[]
	}
	{
		let errors: Error[] = []

		const limitResult = wrapType<ValidInteger, InvalidIntegerException>(
			() => ValidInteger.from( limit ) )

		if ( limitResult instanceof Error ) {
			errors.push( limitResult )
		}

		if ( errors.length > 0 ) {
			return {
				errors: flatErrors( errors )
			}
		}

		return {
			limit: limitResult as ValidInteger
		}
  }
}
