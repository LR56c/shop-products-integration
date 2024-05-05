import { UUID } from '../../shared/domain/value_objects/UUID'
import { ValidInteger } from '../../shared/domain/value_objects/ValidInteger'
import {
	Cart,
	CartUser
} from './cart'
import { Email } from '../../shared/domain/value_objects/Email'

export abstract class CartRepository {
	abstract add( user_email : Email, product_id : UUID, quantity: ValidInteger  ): Promise<boolean>
	abstract remove( email : Email, product_id : UUID ): Promise<boolean>
	abstract removeAll( email : Email ): Promise<boolean>
	abstract update( user_email : Email, product_id : UUID, quantity: ValidInteger  ): Promise<boolean>
	abstract getAll( from: ValidInteger, to: ValidInteger, email? : Email ): Promise<Cart[]>
	abstract getByUserEmail( email : Email ): Promise<CartUser>
}
