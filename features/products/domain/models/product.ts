import { UUID } from '../../../shared/domain/value_objects/UUID';
import { ValidString } from '../../../shared/domain/value_objects/ValidString';
import { ValidDate } from '../../../shared/domain/value_objects/ValidDate';
import { ValidInteger } from '../../../shared/domain/value_objects/ValidInteger';
import { ValidDecimal } from '../../../shared/domain/value_objects/ValidDecimal';

export class Product {
 private constructor( readonly id: UUID, readonly code: ValidString, readonly name : ValidString, readonly description: ValidString, create_at: ValidDate, brand: ValidString, price : ValidInteger, image_url: ValidString, stock: ValidInteger, rank: ValidDecimal) {}

}

