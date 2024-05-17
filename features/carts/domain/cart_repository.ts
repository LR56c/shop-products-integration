import { UUID } from '../../shared/domain/value_objects/UUID'
import { ValidInteger } from '../../shared/domain/value_objects/ValidInteger'
import { Email } from '../../shared/domain/value_objects/Email'
import {
	CartProductResponse
} from './cart_response'

export abstract class CartRepository {
	abstract upsert( user_email: Email, product_id: UUID,
		quantity: ValidInteger ): Promise<boolean>

	abstract remove( email: Email, product_id: UUID ): Promise<boolean>

	abstract removeAll( email: Email ): Promise<boolean>

	abstract getByUserEmail( email: Email ): Promise<CartProductResponse[]>
}
