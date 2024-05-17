import { Product } from '../../products/domain/models/product'
import { Email } from '../../shared/domain/value_objects/Email'
import { ValidInteger } from '../../shared/domain/value_objects/ValidInteger'
import {UUID} from "../../shared/domain/value_objects/UUID";

export class Cart{
	constructor(
		readonly userEmail: Email,
		readonly product: UUID,
		readonly quantity: ValidInteger
	) {}
}

