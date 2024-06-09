import { Email } from '../../shared/domain/value_objects/email'
import { UUID } from '../../shared/domain/value_objects/uuid'
import { ValidInteger } from '../../shared/domain/value_objects/valid_integer'
import { CartProductResponse } from './cart_response'

export abstract class CartRepository {
	abstract upsert( user_email: Email, product_id: UUID,
		quantity: ValidInteger ): Promise<boolean>

	abstract remove( email: Email, product_id: UUID ): Promise<boolean>

	abstract removeAll( email: Email ): Promise<boolean>

	abstract getByUserEmail( email: Email ): Promise<CartProductResponse[]>
}
