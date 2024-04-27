import { ValidRank } from './ValidRank'
import { UUID } from '../../../shared/domain/value_objects/UUID'
import { ValidDate } from '../../../shared/domain/value_objects/ValidDate'
import { ValidInteger } from '../../../shared/domain/value_objects/ValidInteger'
import { ValidString } from '../../../shared/domain/value_objects/ValidString'
import { ValidURL } from '../../../shared/domain/value_objects/ValidURL'

export class Product {
 constructor(
   readonly id: UUID,
   readonly code: ValidString,
   readonly name: ValidString,
   readonly description: ValidString,
   readonly create_at: ValidDate,
   readonly brand: ValidString,
   readonly price: ValidInteger,
   readonly image_url: ValidURL,
   readonly stock: ValidInteger,
   readonly rank: ValidRank,
   readonly category_name: ValidString) {}

  subtractStock( newQuantity: ValidInteger ): Product {
    return new Product(
      this.id,
      this.code,
      this.name,
      this.description,
      this.create_at,
      this.brand,
      this.price,
      this.image_url,
      newQuantity,
      this.rank,
      this.category_name
    )
  }
}

