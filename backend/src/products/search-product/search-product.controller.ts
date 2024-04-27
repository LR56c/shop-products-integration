import { Controller } from '@nestjs/common';
import { Translation } from 'src/shared/infrastructure/parseTranslation'
import { SearchProductService } from './search-product.service';
import { ValidString } from '~features/shared/domain/value_objects/ValidString';
import { InvalidStringException } from '~features/shared/domain/exceptions/InvalidStringException';
import { ValidInteger } from '~features/shared/domain/value_objects/ValidInteger';
import { wrapType } from '~features/shared/utils/WrapType';
import { InvalidIntegerException } from '~features/shared/domain/exceptions/InvalidIntegerException';
import { flatErrors } from '~features/shared/utils/FlatErrors';

@Controller('products')
export class SearchProductController {
  constructor(private readonly searchProductService: SearchProductService) {}
  parseGetAllParams( name : string, from : number, to : number): {
    name?: ValidString,
    from?: ValidInteger,
    to?: ValidInteger,
    errors?: Map<string, Translation>
  }
  {
    let errors: Error[] = []

    const nameResult = wrapType<ValidString, InvalidStringException>(
      () => ValidString.from( name ) )

    if ( nameResult instanceof Error ) {
      errors.push( nameResult )
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
      name: nameResult as ValidString,
      from: fromResult as ValidInteger,
      to: toResult as ValidInteger
    }
  }
}
