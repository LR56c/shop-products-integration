import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { SearchProductService } from './search-product.service'

@ApiTags('products')
@Controller('products')
export class SearchProductController {
  constructor(private readonly searchProductService: SearchProductService) {}
  // parseGetAllParams( name : string, from : number, to : number): {
  //   name?: ValidString,
  //   from?: ValidInteger,
  //   to?: ValidInteger,
  //   errors?: Map<string, Translation>
  // }
  // {
  //   let errors: Error[] = []
  //
  //   const nameResult = wrapType<ValidString, InvalidStringException>(
  //     () => ValidString.from( name ) )
  //
  //   if ( nameResult instanceof Error ) {
  //     errors.push( nameResult )
  //   }
  //
  //   const fromResult = wrapType<ValidInteger, InvalidIntegerException>(
  //     () => ValidInteger.from( from ) )
  //
  //   if ( fromResult instanceof Error ) {
  //     errors.push( fromResult )
  //   }
  //
  //   const toResult = wrapType<ValidInteger, InvalidIntegerException>(
  //     () => ValidInteger.from( to ) )
  //
  //   if ( toResult instanceof Error ) {
  //     errors.push( toResult )
  //   }
  //
  //   if ( errors.length > 0 ) {
  //     return {
  //       errors: flatErrors( errors )
  //     }
  //   }
  //   return {
  //     name: nameResult as ValidString,
  //     from: fromResult as ValidInteger,
  //     to: toResult as ValidInteger
  //   }
  // }
}
