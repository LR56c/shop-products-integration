import { InvalidURLException } from '../../../shared/domain/exceptions/InvalidURLException'
import { InvalidUUIDException } from '../../../shared/domain/exceptions/InvalidUUIDException'
import { ValidURL } from '../../../shared/domain/value_objects/ValidURL'
import { UUID } from '../../../shared/domain/value_objects/UUID';
import { ValidString } from '../../../shared/domain/value_objects/ValidString';
import { ValidDate } from '../../../shared/domain/value_objects/ValidDate';
import { ValidInteger } from '../../../shared/domain/value_objects/ValidInteger';
import { ValidDecimal } from '../../../shared/domain/value_objects/ValidDecimal';
import { wrapType } from '../../../shared/utils/WrapType';
import { InvalidStringException } from '../../../shared/domain/exceptions/InvalidStringException';
import { InvalidDateException } from '../../../shared/domain/exceptions/InvalidDateException';
import { InvalidIntegerException } from '../../../shared/domain/exceptions/InvalidIntegerException';
import { InvalidDecimalException } from '../../../shared/domain/exceptions/InvalidDecimalException';

export class Product {
 private constructor(
   readonly id: UUID,
   readonly code: ValidString,
   readonly name: ValidString,
   readonly description: ValidString,
   readonly create_at: ValidDate,
   readonly brand: ValidString,
   readonly price: ValidInteger,
   readonly image_url: ValidURL,
   readonly stock: ValidInteger,
   readonly rank: ValidDecimal,
   readonly category_name: ValidString) {}

  static from( props: {
    id: string,
    code: string,
    name: string,
    description: string,
    create_at: Date,
    brand: string,
    price: number,
    image_url: string,
    stock: number,
    rank: number,
    category_name : string
  } ): Product {

   const errors: Error[] = []

    const id = wrapType<UUID, InvalidUUIDException>(
      () => UUID.from( props.id ) )

    if ( id instanceof Error ) {
      errors.push( id )
    }

    const code = wrapType<ValidString, InvalidStringException>( () => ValidString.from( props.code ) )

    if ( code instanceof Error ) {
      errors.push( code )
    }

    const name = wrapType<ValidString, InvalidStringException>( () => ValidString.from( props.name ) )

    if ( name instanceof Error ) {
      errors.push( name )
    }

    const description = wrapType<ValidString, InvalidStringException>( () => ValidString.from( props.description ) )

    if ( description instanceof Error ) {
      errors.push( description )
    }

    const create_at = wrapType<ValidDate, InvalidDateException>( () => ValidDate.from( props.create_at ) )

    if ( create_at instanceof Error ) {
      errors.push( create_at )
    }

    const brand = wrapType<ValidString, InvalidStringException>( () => ValidString.from( props.brand ) )

    if ( brand instanceof Error ) {
      errors.push( brand )
    }

    const price = wrapType<ValidInteger, InvalidIntegerException>( () => ValidInteger.from( props.price ) )

    if ( price instanceof Error ) {
      errors.push( price )
    }

    const image_url = wrapType<ValidURL, InvalidURLException>( () => ValidURL.from( props.image_url ) )

    if ( image_url instanceof Error ) {
      errors.push( image_url )
    }

    const stock = wrapType<ValidInteger, InvalidIntegerException>( () => ValidInteger.from( props.stock ) )

    if ( stock instanceof Error ) {
      errors.push( stock )
    }

    const rank = wrapType<ValidDecimal, InvalidDecimalException>( () => ValidDecimal.from( props.rank ) )

    if ( rank instanceof Error ) {
      errors.push( rank )
    }

    const category_name = wrapType<ValidString, InvalidStringException>( () => ValidString.from( props.category_name ) )

    if ( category_name instanceof Error ) {
      errors.push( category_name )
    }

    if ( errors.length > 0 ) {
      throw errors
    }

    return new Product(
      id as UUID,
      code as ValidString,
      name as ValidString,
      description as ValidString,
      create_at as ValidDate,
      brand as ValidString,
      price as ValidInteger,
      image_url as ValidURL,
      stock as ValidInteger,
      rank as ValidDecimal,
      category_name as ValidString
    )
  }
}

